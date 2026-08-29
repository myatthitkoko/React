import express from "express";
import { randomBytes } from 'crypto';
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { db } from "./db/connection.js";
import cors from "cors";
import { sendMail } from "./emailAPI.js"
import { oauth2Client, readCalendarEvents } from "./googleCalendar.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const TIME_ZONE = "America/Los_Angeles";

const app = express();

app.post(
  "/api/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error(
        "Webhook signature verification failed:",
        err.message
      );

      return res.sendStatus(400);
    }

    console.log("Stripe event:", event.type);
    console.log("LIVE MODE:", event.livemode);

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const {
          bookingID,
          dateAndTime,
          name,
          email,
          phone,
          comment,
        } = session.metadata || {};

        if (!bookingID || !dateAndTime || !name || !email) {
          console.error(
            "Missing booking information in Stripe metadata"
          );

          return res.sendStatus(400);
        }

        console.log("PAYMENT SUCCESSFUL");
        console.log("Booking ID:", bookingID);

        await db.execute(
          `
          INSERT INTO bookings
            (
              id,
              date_and_time,
              name,
              email,
              phone,
              comment,
              stripe_session_id
            )
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            stripe_session_id = VALUES(stripe_session_id)
          `,
          [
            bookingID,
            toMYSQLDate(dateAndTime),
            name,
            email,
            phone,
            comment,
            session.id,
          ]
        );

        await sendMail(
          email,
          name,
          bookingID,
          new Date(dateAndTime)
        );
      }

      res.json({ received: true });
    } catch (err) {
      console.error(
        "Stripe webhook processing failed:",
        err
      );

      res.sendStatus(500);
    }
  }
);

app.use(express.json());

app.use(cors({origin: "https://jesseniasnailss.com"}));

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

async function checkBooking(newBooking) {
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


  return {
    success: true
  }
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

app.post(
  "/api/booking",
  async (req, res) => {
    try {
      const {
        dateAndTime,
        name,
        email,
        phone,
        comment,
      } = req.body;

      const result =
        await checkBooking(req.body);

      if (!result.success) {
        return res.status(409).json(result);
      }

      const bookingID =
        randomBytes(8).toString("base64url");

      const zonedDate = toZonedTime(
        dateAndTime,
        TIME_ZONE
      );

      const date = format(
        zonedDate,
        "EEEE, MMMM d, yyyy"
      );

      const time = format(
        zonedDate,
        "h:mm a"
      );

      const session =
        await stripe.checkout.sessions.create({
          mode: "payment",

          line_items: [
            {
              price_data: {
                currency: "usd",

                product_data: {
                  name:
                    `Nails By Jess - Appointment on ${date} at ${time}`,
                },

                unit_amount: 2000,
              },

              quantity: 1,
            },
          ],

          metadata: {
            bookingID,
            dateAndTime,
            name,
            email,
            phone: phone || "",
            comment: comment || "",
          },

          success_url:
            "https://mydomain.com/success",

          cancel_url:
            "https://mydomain.com/try-again",
        });

      return res.json({
        success: true,
        bookingID,
        url: session.url,
      });
    } catch (err) {
      console.error(
        "Booking creation failed:",
        err
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to create booking.",
      });
    }
  }
);

/*One-Time Authorization for Refresh Token
app.get("/api/google/auth", (req, res) => {
  console.log("GOOGLE CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE REDIRECT URI:", process.env.GOOGLE_REDIRECT_URI);

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar.events"
    ],
    prompt: "consent"
  });

  console.log("GOOGLE AUTH URL:", url);

  res.redirect(url);
});

app.get("/api/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("No authorization code received.");
    }

    const { tokens } = await oauth2Client.getToken(code);

    console.log(
      "OAuth successful. Refresh token received:",
      Boolean(tokens.refresh_token)
    );

    // TEMPORARY:
    console.log("REFRESH TOKEN:", tokens.refresh_token);

    res.send("Google Calendar connected successfully. Check Railway logs.");
  } catch (err) {
    console.error("Google OAuth failed:", err);
    res.status(500).send("Google Calendar authorization failed.");
  }
});
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running now on ${PORT}`);
});
