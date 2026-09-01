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
    console.log("========== WEBHOOK START ==========");

    const sig = req.headers["stripe-signature"];

    console.log("HAS STRIPE SIGNATURE:", Boolean(sig));
    console.log("BODY TYPE:", typeof req.body);
    console.log("BODY IS BUFFER:", Buffer.isBuffer(req.body));

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );

      console.log("========== SIGNATURE VERIFIED ==========");
      console.log("EVENT ID:", event.id);
      console.log("EVENT TYPE:", event.type);
      console.log("LIVE MODE:", event.livemode);
    } catch (err) {
      console.error("WEBHOOK SIGNATURE FAILED:", err);
      return res.sendStatus(400);
    }

    try {
      if (event.type !== "checkout.session.completed") {
        console.log("IGNORING EVENT:", event.type);
        return res.json({ received: true });
      }

      console.log("========== CHECKOUT COMPLETED ==========");

      const session = event.data.object;

      console.log("SESSION ID:", session.id);
      console.log("SESSION PAYMENT STATUS:", session.payment_status);
      console.log("SESSION LIVE MODE:", session.livemode);
      console.log("SESSION METADATA:", session.metadata);

      const { bookingID } = session.metadata || {};

      console.log("BOOKING ID FROM STRIPE:", bookingID);

      if (!bookingID) {
        console.error("NO BOOKING ID IN STRIPE METADATA");
        return res.sendStatus(400);
      }

      console.log("========== BEFORE DB UPDATE ==========");

      const [result] = await db.execute(
        `
        UPDATE bookings
        SET
          paid = true,
          stripe_session_id = ?
        WHERE id = ?
          AND paid = false
        `,
        [
          session.id,
          bookingID
        ]
      );

      console.log("========== DB UPDATE FINISHED ==========");
      console.log("AFFECTED ROWS:", result.affectedRows);
      console.log("CHANGED ROWS:", result.changedRows);

      const booking = await readRow(bookingID);

      console.log("========== READ BOOKING ==========");
      console.log("BOOKING:", booking);

      if (!booking) {
        console.error(
          "BOOKING DOES NOT EXIST AFTER UPDATE:",
          bookingID
        );

        return res.sendStatus(500);
      }

      if (!booking.mailed) {
        console.log("========== SENDING EMAIL ==========");

        await sendMail(
          booking.email,
          booking.name,
          bookingID,
          new Date(booking.date_and_time)
        );

        console.log("========== EMAIL SENT ==========");

        await db.execute(
          `
          UPDATE bookings
          SET mailed = true
          WHERE id = ?
          `,
          [bookingID]
        );

        console.log("========== MAILED FLAG UPDATED ==========");
      }

      console.log("========== WEBHOOK SUCCESS ==========");

      return res.json({ received: true });

    } catch (err) {
      console.error("========== WEBHOOK PROCESSING FAILED ==========");
      console.error(err);
      console.error("ERROR MESSAGE:", err?.message);
      console.error("ERROR STACK:", err?.stack);

      return res.sendStatus(500);
    }
  }
);

app.use(express.json());

app.use(cors({origin: "https://jesseniasnailss.com"}));

async function readRowWithRetry(bookingID, attempts = 5, delay = 500) {
  for (let i = 0; i < attempts; i++) {

    const booking = await readRow(bookingID);

    if (booking) {
      return booking;
    }

    if (i < attempts - 1) {
      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }
  }

  return null;
}

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
  console.log("========== toMYSQLDate ==========");
    console.log("RAW date:", date);
    console.log("RAW TYPE:", typeof date);
    console.log("RAW instanceof Date:", date instanceof Date);

    const parsedDate = new Date(date);

    console.log("PARSED date:", parsedDate);
    console.log("PARSED TIME:", parsedDate.getTime());
    console.log("VALID:", !Number.isNaN(parsedDate.getTime()));

    if (Number.isNaN(parsedDate.getTime())) {
        console.error(
            "INVALID DATE PASSED TO toMYSQLDate:",
            date
        );
        throw new Error(
            `Invalid date passed to toMYSQLDate: ${String(date)}`
        );
    }

    return parsedDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
}

async function readActiveBookings() {
  const [rows] = await db.query(`
    SELECT *
    FROM bookings
    WHERE
      paid = true
      OR (paid = false AND expires_at > NOW())
  `);

  return rows;
};

async function checkBooking(newBooking) {
  const bookings = await readActiveBookings();

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

  const bookings = await readActiveBookings();

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
    console.log("Incoming booking request body:", req.body); // Let's see what the frontend is actually sending

    const {
        dateAndTime,
        name,
        email,
        phone,
        comment
    } = req.body;

    if (!dateAndTime) {
        return res.status(400).json({
            success: false,
            message: "Missing dateAndTime in request body."
        });
    }

    const bookingID = randomBytes(8).toString("base64url");
    const newBookingStart = new Date(dateAndTime);

    if (isNaN(newBookingStart.getTime())) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format received for dateAndTime."
        });
    }

    const newBookingEnd = new Date(
        newBookingStart.getTime() + 3 * 60 * 60 * 1000
    );

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        const [rows] = await connection.execute(
            `
            SELECT *
            FROM bookings
            WHERE date_and_time < ?
              AND DATE_ADD(date_and_time, INTERVAL 3 HOUR) > ?
              AND (
                  paid = true
                  OR (paid = false AND expires_at > NOW())
              )
            FOR UPDATE
            `,
            [
                toMYSQLDate(newBookingEnd),
                toMYSQLDate(newBookingStart)
            ]
        );

        if (rows.length > 0) {
            await connection.rollback();
            return res.status(409).json({
                success: false,
                message: "This time slot is currently on hold by another active user."
            });
        }

        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        // Map everything explicitly to ensure NO 'undefined' can ever reach mysql2
        await connection.execute(
            `
            INSERT INTO bookings
            (
                id,
                date_and_time,
                name,
                email,
                phone,
                comment,
                paid,
                expires_at,
                mailed
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                bookingID,
                toMYSQLDate(newBookingStart),
                name ?? "Unknown",
                email ?? "no-email@provided.com",
                phone ?? null,
                comment ?? null,
                false,
                toMYSQLDate(expiresAt),
                false
            ]
        );

        await connection.commit();

    } catch (err) {
        await connection.rollback();
        console.error("Booking creation error:", err);
        throw err;
    } finally {
        connection.release();
    }

    const zonedDate = toZonedTime(dateAndTime, TIME_ZONE);
    const date = format(zonedDate, "EEEE, MMMM d, yyyy");
    const time = format(zonedDate, "h:mm a");

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Nails By Jess - Appointment on ${date} at ${time}`,
                    },
                    unit_amount: 2000
                },
                quantity: 1
            }
        ],
        metadata: {
            bookingID
        },
        success_url: "https://jesseniasnailss.com/booking-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://jesseniasnailss.com/try-again"
    });

    await db.execute(
        `
        UPDATE bookings
        SET stripe_session_id = ?
        WHERE id = ?
        `,
        [session.id, bookingID]
    );

    return res.json({
        success: true,
        bookingID,
        url: session.url
    });
});

async function readRow(bookingID) {
  const [bookingRows] = await db.execute(
    `
    SELECT
      id,
      date_and_time,
      name,
      email,
      phone,
      comment,
      paid,
      mailed
    FROM bookings
    WHERE id = ?
    `,
    [bookingID]
  );

  if (bookingRows.length === 0) {
    return null;
  }

  return bookingRows[0];
}


app.get("/api/booking/success", async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).send("No session ID received.");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") {
    return res.status(400).send("No payment received.");
  }

  const { bookingID } = session.metadata || {};

  const booking = await readRow(bookingID);

  return res.json({
    success: true,
    bookingID: booking.id,
    dateAndTime: booking.date_and_time,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    comment: booking.comment
  });
});

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
