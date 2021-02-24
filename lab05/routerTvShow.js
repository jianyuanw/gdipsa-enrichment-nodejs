const e = require("express");
const express = require("express");
const { data } = require("./data");
const tvRouter = express.Router();

const sortTitle = (order) => {
  if (order === "asc") {
    return (a, b) => (a.title < b.title ? -1 : 1);
  }
  if (order === "desc") {
    return (a, b) => (a.title > b.title ? -1 : 1);
  }
  return undefined;
};

tvRouter.route("/").get((req, res) => {
  console.log(req.query);

  let result = {};

  // Filter by substring in title
  if (req.query.contains) {
    result = data.filter((item) =>
      item.title.toLowerCase().includes(req.query.contains.toLowerCase())
    );
  } else {
    result = data;
  }

  // Sort by title
  if (req.query.sorted) {
    result.sort(sortTitle(req.query.sorted));
  }

  res.json(result);
});

tvRouter.route("/").post((req, res) => {
  let tvshow = req.body;
  data.push(tvshow);
  [tvshow] = data.slice(-1);
  res.json(tvshow);
});

tvRouter.route("/:id/:case?").get((req, res) => {
  console.log(req.params);
  const result = data.filter((item) => item.id == req.params.id);
  let item = result[0];

  if (item) {
    let title = item.title;
    if (req.params.case === "upper") {
      title = item.title.toUpperCase();
    } else if (req.params.case === "lower") {
      title = item.title.toLowerCase();
    }
    item = { ...item, title };
  }

  res.json({ result: item });
});

tvRouter.route("/:id").put((req, res) => {
  let input = req.body;
  let id = Number(req.params.id);
  console.log(id, input);
  let result = data.filter((item) => item.id == id);
  let item = result[0];
  if (item) {
    item.title = input.title;
    res.status(200).json(item);
  } else {
    res.status(404).send(`Item not found. ID: ${id}`);
  }
});

tvRouter.route("/:id").delete((req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  let index = data.findIndex((item) => item.id == id);
  console.log(index);
  if (index != -1) {
    let deletedItem = data.splice(index, 1);
    res.status(200).json(deletedItem);
  } else {
    res.status(404).send(`Item not found. ID: ${id}`);
  }
});

module.exports = tvRouter;
