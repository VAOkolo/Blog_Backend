// @ts-nocheck
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const data = require("./data/posts.json");

//file system essentials
const fs = require("fs");

app.listen(port, () => {
  console.log(`listening at port ${port}`);
//   readPosts();
});

//muse posts requests
//get all posts
app.get("/posts", (req, res) => {
  console.log("test");
  res.send(data);
});
//get specific post
app.get("/posts/:post", (req, res) => {
  const post = parseInt(req.params.post);
  const selectedPost = data.filter((hostPost) => {
    return hostPost.id == post;
  });
  res.send(selectedPost[0]);
});
//post specific post
app.post("/posts/post", (req, res) => {
  const data = req.body;

  readPosts(data);
});

//muse comment requests
//get all comments from parent post
app.get("/posts/:post/comments", (req, res) => {
    const post = parseInt(req.params.post);
    const selectedPost = data.filter((hostPost) => {
      return hostPost.id == post;
    });
    // console.log(selectedPost[0].comments);
    res.send(selectedPost[0].comments);
});
//get specific comment - likely to turn into delete if used as stretch goal
app.get("/posts/:post/comments/:comment", (req, res) => {
    const post = parseInt(req.params.post);
    const comment = parseInt(req.params.comment);
    // console.log(data[0].comments[0].id);
    const selectedPost = data.filter((hostPost) => {
      return hostPost.id == post;
    });
    const selectedComments = data.filter((hostComment) => {

    })
    console.log(selectedPost);
    res.send(selectedPost);
});
//posting a comment
app.post("posts/:post/:comment", (req, res) => {});

//put request
app.put("/posts/:post/reactions", (req, res) => {

});

function readPosts(newPost) {
    // let data = fs.readFileSync("./data/posts.json")  
    // data = JSON.parse(data);
    let allData;
    // read all files
    fs.readFile("./data/posts.json", (err, fileData) => {
    if (err) {
      console.log(err);
    }
    allData = JSON.parse(fileData);
    console.log(allData);
    // push new entry into array
    allData = [...allData, newPost];
    console.log(allData);
    // write data to file
     fs.writeFile("./data/test.json",
    JSON.stringify(allData, null, 2),
    (err) => {
    if (err) {
    console.log(err);
        }
    });
  });
}

//   calling readPosts function
// readPosts({
//   id: 4,
//   content: "user input",
//   giphy: [
//     {
//       id: "003",
//       source: "url",
//     },
//   ],
//   created: "02/06/2022",
//   reactions: [
//     {
//       heart: 0,
//       like: 5,
//       dislike: 2,
//     },
//   ],
//   comments: [
//     {
//       id: "001",
//       content: "user input",
//       giphy: [
//         {
//           id: "003",
//           source: "url",
//         },
//       ],
//       created: "02/06/2022",
//       reactions: [
//         {
//           heart: 0,
//           like: 5,
//           dislike: 2,
//         },
//       ],
//     },
//   ],
// });

