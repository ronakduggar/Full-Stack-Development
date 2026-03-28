const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("You are on HomePage");
});

app.get("/about", (req, res) => {
  res.send(`This is your Name ${req.query.name}`);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
