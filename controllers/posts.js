const express = require("express");
const router = express.Router();
const data = require("../data/posts.json");
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

  // * the only thing i'm not happy about is will it still work if the post has been just added? maybe this is not even that important?
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
    body: { amount },
    params: { post, reaction },
  } = req;

  Post.updateReactions(reaction, post, amount);

  res.status(200).send("Succesfully updated!");
});

module.exports = router;
