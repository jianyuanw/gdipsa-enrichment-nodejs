const express = require("express");
const app = express();
const tvRouter = express.Router();

const data = [
  { id: 1, title: "Game of Thrones" },
  { id: 2, title: "Stranger Things" },
  { id: 3, title: "The Walking Dead" },
  { id: 4, title: "The 100" },
  { id: 5, title: "Arrow" },
];

const sortTitle = (order) => {
  if (order === "asc") {
    return (a, b) => (a.title < b.title ? -1 : 1);
  }
  if (order === "desc") {
    return (a, b) => (a.title > b.title ? -1 : 1);
  }
  return undefined;
};

tvRouter.route("/tvshows").get((req, res) => {
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

tvRouter.route("/demo/:x/:y?/:z?").get((req, res) => {
  console.log(req.params);
  res.json([req.params.x, req.params.y, req.params.z]);
});

tvRouter.route("/tvshows/:id/:case?").get((req, res) => {
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

app.use("/api", tvRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));
