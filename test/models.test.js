const postsData = require("../data/posts.json");
const Post = require("../models/post.js");

const uniqid = require("uniqid");
jest.mock("uniqid");
describe("Models", () => {
  describe("Post", () => {
    const id = uniqid();
    const newDate = new Date();
    const testNewPost = {
      id,
      content: "user input",
      giphy: "",
      created: newDate,
      reactions: {
        love: 0,
        like: 0,
        dislike: 0,
      },
      comments: [],
    };
    it("should make an instance of a post", () => {
      const post = new Post(testNewPost);

      expect(post.id).toBe(id);
      expect(post.content).toBe("user input");
      expect(post.created).toBe(newDate);
    });

    it("should return all posts", () => {
      const posts = Post.all;

      expect(posts).toEqual(postsData);
    });

    it("should return a post", () => {
      const post = Post.findById(1);

      expect(post).toEqual(postsData[0]);
    });

    it("should throw an error if no post found", () => {
      function testError() {
        Post.findById(50);
      }

      expect(testError).toThrowError("Post not found");
    });
  });
});
