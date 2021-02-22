const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.listen(1337);

console.log("Server running at 127.0.0.1:1337");
