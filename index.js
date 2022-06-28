const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//maybe we could put this in a separate file
const uniqid = require("uniqid");

const port = process.env.PORT || 5001;
const data = require("./data/posts.json");
//file system essentials
const fs = require("fs");

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

//muse posts requests
//get all posts
app.get("/posts", (req, res) => {
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

//post new entry

app.post("/posts/post", (req, res) => {
  const data = req.body;

  readPosts(data);

  //!! we need to send something back to the frontend when we do this, so we can just send the data back
  res.status(201).send(data);
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
    console.log(selectedPost[0].comments);
    // res.send(selectedPost);

    const selectedComment = selectedPost[0].comments.filter((hostComment) => {
        return hostComment.id == comment;
    })
    console.log(selectedComment);
    res.send(selectedComment);
});
//posting a comment

app.post("/posts/:post/comment", (req, res) => {
  //!!stopped making :comment programatically as we wouldn't need to use it, because the id is generated here
  const {
    body: { content },
    params: { post },
  } = req;

  const newComment = {
    id: uniqid(),
    content,
    created: new Date(),
  };

  addNewComment(newComment, post);

  res.status(201).send(newComment);
});

//put request
app.put("/posts/:post/reactions", (req, res) => {
//take body of request and write to sheet
    const data = req.body;
    console.log(data);
});

function readPosts(newPost) {
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
    // write data to file
    fs.writeFile(
      "./data/posts.json",
      JSON.stringify(allData, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  return allData;
}

// should change "test" for "posts" at given time
function addNewComment(newComment, post) {
  fs.readFile("./data/test.json", (err, fileData) => {
    if (err) {
      console.log(err);
    }

    let dataToUpdate = JSON.parse(fileData);

    let selectedPost = dataToUpdate.filter((hostPost) => {
      return hostPost.id == post;
    })[0];

    const indexOfSelectedPost = dataToUpdate.indexOf(selectedPost);

    const updatedArray = [
      ...dataToUpdate.slice(0, indexOfSelectedPost),
      {
        // here update data value
        ...dataToUpdate[indexOfSelectedPost],
        ["comments"]: [...selectedPost.comments, newComment],
      },
      ...dataToUpdate.slice(indexOfSelectedPost + 1),
    ];
    fs.writeFile(
      "./data/test.json",
      JSON.stringify(updatedArray, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}
