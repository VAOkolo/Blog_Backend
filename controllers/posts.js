const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const {
  readPosts,
  addNewComment,
  updateReactions,
} = require("../models/functions");
const data = require("../data/posts.json");
const Post = require("../models/post");

//muse posts requests
//get all posts
router.get("/", (req, res) => {
  const posts = Post.all;
  res.send(posts);
});

//get specific post
router.get("/:post", (req, res) => {
  const post = parseInt(req.params.post);
  const selectedPost = data.filter((hostPost) => {
    return hostPost.id == post;
  });
  res.send(selectedPost[0]);
});

//post new entry
router.post("/post", (req, res) => {
  const {
    body: { content, giphy },
  } = req;

  const newPost = Post.create(content, giphy);

  res.status(201).send(newPost);
});

//muse comment requests
//get all comments from parent post
router.get("/:post/comments", (req, res) => {
  const {
    params: { post },
  } = req;
  // const post = parseInt(req.params.post);
  const selectedPost = data.filter((hostPost) => {
    return hostPost.id == post;
  });
  // console.log(selectedPost[0].comments);
  Post.newComment();
  res.send(selectedPost[0].comments);
});
//get specific comment - likely to turn into delete if used as stretch goal
router.get("/:post/comments/:comment", (req, res) => {
  const post = parseInt(req.params.post);
  const comment = parseInt(req.params.comment);
  // console.log(data[0].comments[0].id);
  const selectedPost = data.filter((hostPost) => {
    return hostPost.id == post;
  });

  const selectedComment = selectedPost[0].comments.filter((hostComment) => {
    return hostComment.id == comment;
  });
  console.log(selectedComment);
  res.send(selectedComment);
});
//posting a comment

router.post("/:post/comment", (req, res) => {
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
router.put("/:post/reactions/:reaction", (req, res) => {
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
  res.status(200).send(amount);
});

module.exports = router;
