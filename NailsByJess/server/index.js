import express from "express";
import { fromZonedTime } from "date-fns-tz";
import { db } from "./db/connection.js";
import cors from "cors";
import { sendMail } from "./emailAPI.js"

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
  const sql = `INSERT INTO bookings (date_and_time, name, email, phone, comment) VALUES (?, ?, ?, ?, ?);`

  await db.query(sql, [
    toMYSQLDate(booking.dateAndTime),
    booking.name,
    booking.email,
    booking.phone,
    booking.comment
  ]);
}

async function createBooking(newBooking) {
  const bookings = await readBookings();

  const newBookingStart = new Date(newBooking.dateAndTime);

  const alreadyBooked = bookings.some((booking) =>  {
    const existingBookingStart = new Date(booking.date_and_time);

    return overlaps(
      newBookingStart,
      existingBookingStart
    );
  });

  if (alreadyBooked) {
    return {
      success: false,
      message: "This time slot is no longer available."
    };
  }

  await saveBooking(newBooking);

  return {
    success: true,
    message: "Your appointment has been accepted."
  };
}

app.get("/api/availability/:date", async (req, res) => {
  const { date } = req.params;
  
  const selectedDate = new Date(date);
  const day = selectedDate.getDay();
  const possibleSlots = (day === 0  || day === 6) ? generateSlots(10, 17, date): generateSlots(16, 19, date);

  const bookings = await readBookings();

  const availableSlots = possibleSlots.filter(
      (newSlot)=> { return !bookings.some((booking) =>  {
        const existingBooking = new Date(booking.date_and_time);
        return overlaps(
          newSlot,
          existingBooking,
        );
      });
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
    sendMail(req.body.email);
  } else {
    return res.status(409).json(result);
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running now on ${PORT}`);
});
