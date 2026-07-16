import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/api/availability", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "availability.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running now on port 3000");
});
