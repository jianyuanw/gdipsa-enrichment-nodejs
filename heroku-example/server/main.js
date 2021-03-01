const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const COOKIES = require("./fortune-cookie");

const getRandomCookie = function () {
  let randomIndex = Math.floor(Math.random() * COOKIES.length);
  return COOKIES[randomIndex];
};

const port = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(morgan("combined"));

app.use(cors());

app.use(express.static(__dirname + "/client"));

app.get(["/", "/index.html"], (req, res) => {
  const cookieText = getRandomCookie();
  res.status(200).type("text/html").send(`<h2>${cookieText}</h2>`);
});

app.get("/api/fortune", (req, res) => {
  let count = parseInt(req.query["n"]) || 1;
  count = Math.min(count, 5);
  const cookieText = [];
  for (let i = 0; i < count; i++) {
    cookieText.push(getRandomCookie());
  }
  res.status(200).type("application/json").json({
    cookies: cookieText,
    timestamp: new Date().toLocaleString(),
  });
});

app.listen(port, () => {
  console.info(`Application started on port ${port} at ${new Date()}`);
});
