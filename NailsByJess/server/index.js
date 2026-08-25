import express from "express";
import { randomBytes } from 'crypto';
import { fromZonedTime } from "date-fns-tz";
import { db } from "./db/connection.js";
import cors from "cors";
import { sendMail } from "./emailAPI.js"
import { readCalendarEvents } from "./googleCalendar.js";

const app = express();
app.use(express.json());

app.use(cors({origin: "https://jesseniasnailss.vercel.app"}));

const generateSlots = (openHour, closeHour, date) => {
  const slots = [];

  for (let hour = openHour; hour+3 <= closeHour; hour++) {
    //Date format YYYY-MM-DDTHH:MM:SS
    const localDateTime =`${date}T${String(hour).padStart(2, "0")}:00:00`;
    const utcDate = fromZonedTime(localDateTime, "America/Los_Angeles");
    slots.push(utcDate);
  };

  return slots;
};

const overlaps = (slotStart, bookingStart) => {
  //format hour * minutes * seconds * milliseconds because getTime returns milliseconds
  const slotEnd = new Date(slotStart.getTime() + 3 * 60 * 60 * 1000);
  const bookingEnd = new Date(bookingStart.getTime() + 3 * 60 * 60 * 1000);

  return ( //allows back to back bookings, return true to block slots, pattern of startA < endB && endA > startB
    slotStart < bookingEnd // new booking starting before existing booking end time
    && 
    slotEnd > bookingStart //new booking ending later than existing booking start time
  );
};

const googleOverlaps = (slotStart, event) => {
  const slotEnd = new Date(
    slotStart.getTime() + 3 * 60 * 60 * 1000
  )

  let eventStart;
  let eventEnd;

  if (event.start?.dateTime && event.end?.dateTime) {
    eventStart = new Date(event.start.dateTime);
    eventEnd = new Date(event.end.dateTime);
  } else if (event.start?.date && event.end?.date) {
    eventStart = fromZonedTime(
      `${event.start.date}T00:00:00`, "America/Los_Angeles"
    );
    eventEnd = fromZonedTime(
      `${event.end.date}T00:00:00`, "America/Los_Angeles"
    );
  } else {
    return false;
  }

  return ( slotStart < eventEnd && slotEnd > eventStart );

};

function toMYSQLDate(date) {
  return new Date(date)
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");
}

async function readBookings() {
  const [rows] = await db.query("SELECT * FROM bookings");
  return rows;
};

async function saveBooking(booking) {
  while ('A' === 'A') {
    const bookingID = randomBytes(8).toString("base64url");
    
    try {
      const sql = `INSERT INTO bookings (id, date_and_time, name, email, phone, comment) VALUES (?, ?, ?, ?, ?, ?);`

      await db.query(sql, [
        bookingID,
        toMYSQLDate(booking.dateAndTime),
        booking.name,
        booking.email,
        booking.phone,
        booking.comment
      ]);

      return bookingID;
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        continue;
      }
      throw err;
    }
  }
}

async function createBooking(newBooking) {
  const bookings = await readBookings();

  const newBookingStart = new Date(newBooking.dateAndTime);
  const newBookingEnd = new Date(newBookingStart.getTime() + 3 * 60 * 60 * 1000);

  const alreadyBooked = bookings.some((booking) =>  {
    const existingBookingStart = new Date(booking.date_and_time);

    return overlaps(
      newBookingStart,
      existingBookingStart
    );
  });

  const calendarEvents = await readCalendarEvents(
    newBookingStart,
    newBookingEnd
  );

  const calendarBlock = calendarEvents.some((event) => {
    return googleOverlaps(
      newBookingStart,
      event
    );
  });

  if (alreadyBooked || calendarBlock) {
    return {
      success: false,
      message: "This time slot is no longer available."
    };
  }

  const bookingID = await saveBooking(newBooking);

  return {
    success: true,
    message: "Your appointment has been accepted.",
    bookingID: bookingID
  };
}

app.get("/api/availability/:date", async (req, res) => {
  const { date } = req.params;
  
  const selectedDate = new Date(date);
  const day = selectedDate.getDay();
  const possibleSlots = (day === 0  || day === 6) ? generateSlots(10, 17, date): generateSlots(16, 19, date);

  const bookings = await readBookings();

  const dayStart = fromZonedTime(
    `${date}T00:00:00`, "America/Los_Angeles"
  );

  const dayEnd = fromZonedTime(
    `${date}T23:59:59`, "America/Los_Angeles"
  );

  const calendarEvents = await readCalendarEvents(
    dayStart,
    dayEnd
  );

  const availableSlots = possibleSlots.filter((newSlot)=> { 
      const bookingBlock = bookings.some((booking) =>  {
        const existingBooking = new Date(booking.date_and_time);
        return overlaps(
          newSlot,
          existingBooking,
        );
      });

      if (bookingBlock) {
        return false;
      }

      const calendarBlock = calendarEvents.some((event) => {
        return googleOverlaps(
          newSlot,
          event
        );
      });

      return !calendarBlock;
  });

  res.json(
    availableSlots.map((slot) => ({
      value: slot.toISOString(),
      display: slot.toLocaleTimeString("en-CA", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit"
      })
    }))
  );

});

app.post("/api/booking", async (req, res) => {
  const {
    dateAndTime,
    name,
    email,
    phone,
    comment
  } = req.body;

  const result = await createBooking(req.body);

  if (result.success) {
    res.json(result);
    sendMail( 
      req.body.email, 
      req.body.name, 
      result.bookingID, 
      req.body.dateAndTime
    );
  } else {
    return res.status(409).json(result);
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running now on ${PORT}`);
});
