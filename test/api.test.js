const request = require("supertest");

const server = require("../index.js");

describe("API server", () => {
  let api;

  let testNewPost = {
    id: 1,
    content: "user input",
    giphy: [],
    created: "02/06/2022",
    reactions: [
      {
        heart: 0,
        like: 0,
        dislike: 0,
      },
    ],
    comments: [],
  };
});
