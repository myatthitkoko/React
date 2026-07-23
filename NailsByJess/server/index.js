import express from "express";
import fs from "fs";
import path from "path";
import { fromZonedTime } from "date-fns-tz";
import { json } from "stream/consumers";

const app = express();

app.use(express.json());

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

function readBookings() {
  return JSON.parse(fs.readFileSync(
    path.join(process.cwd(), "data", "bookings.json"
  ), "utf-8"));
};

function saveBookings(bookings) {
  fs.writeFileSync(path.join(process.cwd(), "data", "bookings.json"), JSON.stringify(bookings, null, 2));
}

function createBooking(newBooking) {
  const bookings = readBookings();

  const alreadyBooked = bookings.some((booking) => booking.dateAndTime === newBooking.dateAndTime);

  if (alreadyBooked) {
    return {
      success: false,
      message: "This time slot is no longer available."
    };
  }

  bookings.push(newBooking);

  saveBookings(bookings);

  return {
    success: true,
    message: "Your appointment has been accepted."
  };
}

app.get("/api/availability/:date", (req, res) => {
  const { date } = req.params;
  
  const selectedDate = new Date(date);
  const day = selectedDate.getDay();
  const possibleSlots = (day === 0  || day === 6) ? generateSlots(10, 17, date): generateSlots(16, 19, date);

  const bookings = readBookings();

  const availableSlots = possibleSlots.filter(
      (newSlot)=> { return !bookings.some((booking) =>  {
        const existingBooking = new Date(booking.dateAndTime);
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

app.post("/api/booking", (req, res) => {
  const {
    dateAndTime,
    name,
    email,
    phone,
    comment
  } = req.body;

  const result = createBooking(req.body);

  if (result.success) {
    res.json(result)
  } else {
    return res.status(409).json(result);
  }

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running now on port 3000");
});
