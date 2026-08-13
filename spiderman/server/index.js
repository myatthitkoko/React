import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running now on ${PORT}`);
});
