const postsData = require("../data/test.json");
const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path");
const {
  selectedPost,
  writePosts,
  updateReactionsFn,
} = require("../assets/helpers.js");

class Post {
  //maybe give this default parameters if non existant
  constructor({ id, content, giphy, created, reactions, comments }) {
    this.id = id;
    this.content = content;
    this.giphy = giphy;
    this.created = created;
    this.reactions = reactions;
    this.comments = comments;
  }
  static get all() {
    const posts = postsData.map((post) => new Post(post));
    return posts;
  }

  static findById(id) {
    const postSelected = selectedPost(Post.all, id);

    return postSelected;
  }

  static create(content, giphy = "") {
    let newPost = new Post({
      id: uniqid(),
      content,
      giphy,
      created: new Date(),
      reactions: { love: 0, like: 0, dislike: 0 },
      comments: [],
    });

    writePosts(newPost);

    return newPost;
  }

  static updateReactions(reaction, post, amount) {
    // console.log("reaction: ", reaction, "post: ", post, "amount: ", amount);
    return updateReactionsFn(reaction, post, amount);
  }
}

module.exports = Post;
