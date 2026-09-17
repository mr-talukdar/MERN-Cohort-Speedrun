const express = require("express");

const app = express();

app.get("/users", (req, res) => {
  console.log("REQUEST REACHED EXPRESS");
  res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.json({ name: "Rahul" });
});

app.post("/users", (req, res) => {
  console.log("POST reached Express");
  res.json({ success: true });
});

app.listen(3000);
