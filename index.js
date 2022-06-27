const express = require('express');
const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 5000

const app = express();
app.use(cors());

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})

app.get('/', (req,res) => {
    console.log("test");
    res.send("Listening");
})

