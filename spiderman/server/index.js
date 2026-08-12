import express from "express";
//import { db } from "./db/connection.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.post("/api/rsvp", async (req,res) => {
    console.log(req.body);
    res.json({success: true});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running now on ${PORT}`);
});
