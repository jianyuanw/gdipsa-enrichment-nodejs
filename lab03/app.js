const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  // res.send('Hello World');
  throw new Error("Injected Error");
});

app.use((req, res) => {
  res.status(404).redirect("/404.html");
});

app.use(function (err, req, res, next) {
  res.status(500).sendFile(path.join(__dirname, "public", "500.html"));
});

app.listen(3000, () => console.log("Server running at port 3000"));
