const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/comment");

//muse posts requests
//get all posts
router.get("/", (req, res) => {
  const posts = Post.all;
  res.send(posts);
});

//get specific post
router.get("/:post", (req, res) => {
  const {
    params: { post },
  } = req;

  const selectedPost = Post.findById(post);

  res.status(200).send(selectedPost);
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

  const comments = Comment.getComments(post);
  res.status(200).send(comments);
});

//get specific comment

router.get("/:post/comments/:comment", (req, res) => {
  const {
    params: { post, comment },
  } = req;

  const selectedComment = Comment.getComment(post, comment);

  res.status(200).send(selectedComment);
});
//posting a comment

router.post("/:post/comment", (req, res) => {
  const {
    body: { content },
    params: { post },
  } = req;
  const newComment = Comment.create(content, post);

  res.status(201).send(newComment);
});

//put request
router.put("/:post/reactions/:reaction", (req, res) => {
  const {
    // body: { amount },
    params: { post, reaction },
  } = req;

  Post.updateReactions(reaction, post);

  res.status(200).send("Succesfully updated!");
});

module.exports = router;
