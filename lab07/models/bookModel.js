const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  authors: [{ firstName: String, lastName: String }],
  tags: [String],
  pages: Number,
  published: Number,
});

module.exports = mongoose.model("Book", bookSchema, "books");
