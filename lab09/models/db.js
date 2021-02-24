const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to database!"))
  .catch((err) => {
    console.log("Cannot connect to database", err.message);
    process.exit();
  });
