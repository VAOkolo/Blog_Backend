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
const data = require("./data/test.json");
//file system essentials
const fs = require("fs");

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

//muse posts requests
//get all posts
app.get("/posts", (req, res) => {
  console.log(data);
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

  res.status(201).send(data);
});

//muse comment requests
//get all comments from parent post
app.get("/posts/:post/comments", (req, res) => {
  const post = parseInt(req.params.post);
  const selectedPost = data.filter((hostPost) => {
    return hostPost.id == post;
  });
  res.send(selectedPost[0].comments);
});
//posting a comment

app.post("/posts/:post/comment", (req, res) => {
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
app.put("/posts/:post/reactions/:reaction", (req, res) => {
  const {
    body: { amount },
    params: { post, reaction },
  } = req;

  //will receive the post id and the reaction type (like, dislike, love)
  //changed in test.json the "reactions" and turned the array into a simple object, changed "heart" for "love"
  //we could either receive it through the body,or just add it to the path, i'm gonna try doing it like this for now
  // within our route we will update the data with the amount of reactions sent. we will add it to the existing amount from here
  updateReactions(reaction, post, amount);
  //if we could manage to read the file and save it to "data", we could send here the updated data back and so they can use it to update the frontend
  //send back something better than this
  res.status(200).send(req.body);
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

    //as this is being constantly reused, maybe throw inside file called "helpers"? or inside a model of post??
    let selectedPost = dataToUpdate.filter((hostPost) => {
      return hostPost.id == post;
    })[0];

    const indexOfSelectedPost = dataToUpdate.indexOf(selectedPost);

    const updatedArray = [
      ...dataToUpdate.slice(0, indexOfSelectedPost),
      {
        // handle error => what happens if the post doesn't exist? - maybe won't be necessary as this would never happen??
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

function updateReactions(reaction, post, amount) {
  fs.readFile("./data/test.json", (err, data) => {
    if (err) {
      console.error(err);
    }
    let dataToUpdate = JSON.parse(data);

    const selectedPost = dataToUpdate.filter((hostPost) => {
      return hostPost.id == post;
    })[0];

    const indexOfSelectedPost = dataToUpdate.indexOf(selectedPost);

    const updatedArray = [
      ...dataToUpdate.slice(0, indexOfSelectedPost),
      {
        // here update data value
        //* handle error => what happens if the post doesn't exist? - maybe won't be necessary as this would never happen??
        ...dataToUpdate[indexOfSelectedPost],
        ["reactions"]: {
          ...selectedPost.reactions,
          [reaction]: selectedPost.reactions[reaction] + amount,
        },
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

module.exports = { app, port };
