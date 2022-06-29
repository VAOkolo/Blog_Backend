const uniqid = require("uniqid");
const { selectedPost, addNewComment } = require("../assets/helpers.js");
const posts = require("../data/posts.json");

class Comment {
  constructor({ id, content, created }) {
    this.id = id;
    this.content = content;
    this.created = created;
  }
  static getComments(postId) {
    const { comments } = selectedPost(posts, postId);
    return comments && comments;
  }

  static getComment(postId, commentId) {
    const selectedP = this.getComments(postId);
    const selectedComment = selectedP.filter(
      (comment) => comment.id === commentId
    )[0];

    return selectedComment;
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
