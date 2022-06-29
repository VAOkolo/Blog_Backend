const uniqid = require("uniqid");
const { addNewComment } = require("../assets/helpers.js");

class Comment {
  constructor({ id, content, created }) {
    this.id = id;
    this.content = content;
    this.created = created;
  }

  static create(content, post) {
    let newComment = {
      id: uniqid(),
      content,
      created: new Date(),
    };

    addNewComment(newComment, post);

    return newComment;
  }
}

module.exports = Comment;
