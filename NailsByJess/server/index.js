import express from "express";
import fs from "fs";
import path from "path";

const app = express();

const allSlots = [
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM"
];

app.get("/api/availability/:date", (req, res) => {
  const { date } = req.params;

  const filePath = path.join(process.cwd(), "data", "bookings.json");
  const bookings = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const bookedTimes = bookings
  .filter((booking) => booking.date === date)
  .map((booking) => booking.time);

  const availableSlots = allSlots.filter(
    (slot)=> !bookedTimes.includes(slot)
  )

  res.json(availableSlots);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running now on port 3000");
});
