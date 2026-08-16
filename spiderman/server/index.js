import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
            console.error("Webhook signature verification failed:", err.message);
            return res.sendStatus(400);
        }

        console.log("Stripe event:", event.type);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const name = session.metadata.name;
            const seat = session.metadata.seat;

            console.log("PAYMENT SUCCESSFUL");
            console.log("Name:", name);
            console.log("Seat:", seat);
            console.log("Session:", session.id);
        }

        res.json({ received: true });
    }
);

const app = express();
app.use(express.json());

app.use(cors({origin: "https://spider-man-bnd.vercel.app"}));

app.post("/api/rsvp", async (req,res) => {
    const { name, comment, datetimes } = req.body;

    const [person] = await db.execute(
        "INSERT INTO people (name, comments) VALUES (?, ?)",
        [name, comment]
    );

    for (const datetime of datetimes) {
        await db.execute(
            "INSERT INTO availability (person_id, datetime) VALUES (?, ?)",
            [person.insertId, datetime]
        );
    }
    res.json({success: true});
});

app.post("/api/reserve", async (req, res) => {
    const { name, seat } = req.body;
    console.log("Reservation request:", { name, seat });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Spider-Man: Brand New Day - Seat G${seat}`,
                    },
                    unit_amount: 1500,
                },
                quantity: 1,
            },
        ],

        metadata: {
            name,
            seat,
        },

        success_url: "https://spider-man-bnd.vercel.app/thanks",
        cancel_url: "https://spider-man-bnd.vercel.app",
    });

    res.json({
        url: session.url,
    });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running now on ${PORT}`);
});
