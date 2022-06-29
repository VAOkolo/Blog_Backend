const uniqid = require("uniqid");
const { selectedPost, addNewComment } = require("../assets/helpers.js");
const posts = require("../data/test.json");

class Comment {
  constructor({ id, content, created }) {
    this.id = id;
    this.content = content;
    this.created = created;
  }
  static getComment(id) {
    const { comments } = selectedPost(posts, id);
    return comments && comments;
  }

  static create(content, post) {
    const newComment = {
      id: uniqid(),
      content,
      created: new Date(),
    };

    addNewComment(newComment, post);

    return newComment;
  }
}

module.exports = Comment;
