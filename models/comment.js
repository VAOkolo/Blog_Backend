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
    const allComments = comments.map((comment) => new Comment(comment));
    return allComments && allComments;
  }

  static getComment(postId, commentId) {
    const selectedP = this.getComments(postId);
    const selectedComment = selectedP.filter(
      (comment) => comment.id === commentId
    )[0];

    return new Comment(selectedComment);
  }

  static create(content, post) {
    const newComment = {
      id: uniqid(),
      content,
      created: new Date(),
    };

    addNewComment(newComment, post);

    return new Comment(newComment);
  }
}

module.exports = Comment;
