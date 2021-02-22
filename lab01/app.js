const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/time", (req, res) => {
  let dt = new Date();
  res.send(`<h2>Current datetime: ${dt}</h2>`);
});

app.get("/greet", (req, res) => {
  let greeting = null;
  let currentTime = new Date().getHours();
  if (currentTime >= 5 && currentTime < 12) greeting = "<h2>Good morning</h2>";
  else if (currentTime >= 12 && currentTime < 7)
    greeting = "<h2>Good afternoon</h2>";
  else greeting = "<h2>Good evening</h2>";
  res.send(greeting);
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
