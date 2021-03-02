const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(morgan("combined"));

app.use(cors());

app.use(express.static(__dirname + "/client"));

app.get("/api/giphy", (req, res) => {
  const q = req.query.q;
  if (!q) {
    res
      .status(400)
      .type("text/html")
      .send("Unable to process request. Please provide a search term.");
  } else {
    const params = {
      api_key: "7TEQWYphha1oGOte1BM1Mlvy0eHaAgkT",
      q,
      limit: 25,
      offset: 0,
      rating: "g",
      lang: "en",
    };
    axios
      .get("https://api.giphy.com/v1/gifs/search", { params })
      .then((result) => {
        const data = result.data.data;
        let images = [];
        for (let i = 0; i < data.length; i++) {
          images.push(data[i].images.fixed_height.url);
        }
        console.log(images);
        res.status(200).type("application/json").json(images);
      })
      .catch((err) => console.log(err));
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}. Timestamp: ${new Date().toLocaleString()}`
  );
});
