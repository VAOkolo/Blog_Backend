const request = require("supertest");

const { app, port } = require("../index.js");

describe("API server", () => {
  let api;

  let testNewPost = {
    id: 1,
    content: "user input",
    giphy: [],
    created: "02/06/2022",
    reactions: {
      love: 0,
      like: 0,
      dislike: 0,
    },
    comments: [],
  };

  beforeAll(() => {
    console.log(port);
    api = app.listen(5050, () =>
      console.log(`Test server running on port ${port}`)
    );
  });

  afterAll((done) => {
    // close the server, then run done
    console.log("Stopping test server");
    api.close(done);
  });

  it("responds to get /posts with status 200", (done) => {
    request(api).get("/posts").expect(200, done);
  });
});
