import express from "express";
import fs from "fs";
import path from "path";
import { fromZonedTime } from "date-fns-tz";

const app = express();

app.use(express.json());

app.get("/api/availability/:date", (req, res) => {
  const { date } = req.params;
  const selectedDate = new Date(date);

  const generateSlots = (
    openHour, closeHour
  ) => {
    const slots = [];

    for (let hour = openHour; hour+3 <= closeHour; hour++) {
      const localDateTime =
      `${date}T${String(hour).padStart(2, "0")}:00:00`;

      const utcDate = fromZonedTime(
        localDateTime,
        "America/Los_Angeles"
      );
      slots.push(utcDate);
    };

    return slots;
  };

  const day = selectedDate.getDay();
  const possibleSlots = (day === 0  || day === 6) ? generateSlots(10, 17): generateSlots(16, 19);

  const overlaps = (slotStart, bookingStart, bookingEnd) => {
    const slotEnd = new Date(
      slotStart.getTime() + 3 * 60 * 60 * 1000
    );

    return (
      slotStart < bookingEnd &&
      slotEnd > bookingStart
    );
  };

  const filePath = path.join(process.cwd(), "data", "bookings.json");
  const bookings = JSON.parse(fs.readFileSync(filePath, "utf-8"));


  const availableSlots = possibleSlots.filter(
      (slot)=> { return !bookings.some((booking) =>  {
        const bookingStart = new Date(booking.dateAndTime);
        console.log(bookingStart)
        const bookingEnd = new Date(bookingStart.getTime() + 3 * 60 * 60 * 1000);
        console.log(bookingEnd)
        return overlaps(
          slot,
          bookingStart,
          bookingEnd
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

  const filePath = path.join(
    process.cwd(),
    "data",
    "bookings.json"
  );

  const bookings = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const alreadyBooked = bookings.some((booking) => booking.dateAndTime === dateAndTime);

  if (alreadyBooked) {
    return res.status(409).json({
      success: false,
      message: "This time slot is no longer available."
    });
  }

  const newBooking = {
    dateAndTime,
    name,
    email,
    phone,
    comment
  };

  bookings.push(newBooking);

  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));

  res.json({
    success: true,
    message: "Your appointment has been accepted."
  })
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running now on port 3000");
});
