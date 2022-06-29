// const { app } = require("./index.js");

// const port = process.env.PORT || 7000;

// app.listen(port, () => {
//   console.log(`listening at port ${port}`);
// });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const postRoutes = require("./controllers/posts");
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Muze API - use an applicable route for content");
});

module.exports = app;

