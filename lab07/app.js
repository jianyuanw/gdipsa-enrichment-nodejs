require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routers/bookRouter");
const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/sa51";

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", () => {
  console.error.bind(console, "Connection error:");
});

db.once("open", function () {
  console.log("Connected to database");
  app.emit("ready");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", bookRouter);

app.on("ready", () => {
  app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
});
