const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//maybe we could put this in a separate file
// const uniqid = require("uniqid");

// const port = process.env.PORT || 7000;
// const data = require("./data/posts.json");
//file system essentials
// const fs = require("fs");

const postRoutes = require('./controllers/posts')
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Muze API - use an applicable route for content')
})

module.exports = app;





