const express = require("express");
const tvRouter = require("./routerTvShow");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tvshow", tvRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));
