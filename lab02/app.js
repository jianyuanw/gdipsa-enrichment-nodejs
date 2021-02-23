const express = require("express");

const app = express();

const handler = (req, res) => {
  console.log(req.headers);
  res.format({
    "text/html": () =>
      res.send(`<h2>Got a ${req.method} request at ${req.originalUrl}</h2>`),
    "text/plain": () =>
      res.send(`<h2>Got a ${req.method} request at ${req.originalUrl}</h2>`),
    default: () => res.status(406).send("Not Acceptable"),
  });
};

app.get("/", handler);
app.post("/", handler);
app.put("/", handler);
app.delete("/", handler);

const timeHandler = (req, res) => {
  console.log(req.headers);
  let dt = new Date().toISOString();
  res.format({
    "text/plain": () => res.send(`${dt}`),
    "text/html": () => res.send({ datetime: dt }),
    "application/json": () => res.send(`<h2>${dt}</h2>`),
    default: () => res.status(406).send("Not Acceptable"),
  });
};

app.get("/time", timeHandler);

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
