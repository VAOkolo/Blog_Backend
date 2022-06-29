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

//responds to invalid method request 
app.post("/", (req, res) => {
  res.status(405).send("Not allowd!");
});

module.exports = app;
