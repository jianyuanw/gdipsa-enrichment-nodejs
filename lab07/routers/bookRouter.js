const express = require("express");
const Book = require("../models/bookModel");

const router = express.Router();

router.route("/").get((req, res) => {
  console.log(req.query);
  Book.find(req.query, (err, books) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(books.length);
    return res.json(books);
  });
});

router.route("/:id").get(async (req, res) => {
  try {
    let book = await Book.findById(req.params.id).exec();
    if (book) {
      return res.json(book);
    }
    return res.status(404).send(`ID not found: ${req.params.id}`);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    let book = new Book(req.body);
    book = await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").put((req, res) => {
  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send(`Item not found. ID: ${id})`);
      }
      return res.json(data);
    })
    .catch((err) => res.status(500).send(err));
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    let item = await Book.findByIdAndDelete(id);
    console.log(item);
    if (item) {
      return res.status(200).send(`Deleted item with ID: ${id}`);
    }
    return res.status(404).send(`Item not found. ID: ${id}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/filter").post(async (req, res) => {
  try {
    const filter = req.body;
    console.log(filter);

    const options = req.query;
    console.log(options);
    options.skip = options.skip ? Number(options.skip) : 0;
    options.limit = options.limit ? Number(options.limit) : 0;

    let result = await Book.find(filter, null, options).exec();
    if (result) {
      res.send(result);
    }
    res.status(404).send(`No items found with the following filter:
    ${filter}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
