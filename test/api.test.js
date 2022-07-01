const request = require("supertest");

const app = require("../server.js");

describe("API server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(7005, () =>
      console.log(`Test server running on port 7005`)
    );
  });

  afterAll((done) => {
    // close the server, then run done
    console.log("Stopping test server");
    api.close(done);
  });

  // Get routes
  it("responds to get /posts with status 200", (done) => {
    request(api).get("/posts").expect(200, done);
  });

  it("responds to get /posts/1 with status 200", (done) => {
    request(api).get("/posts/1").expect(200, done);
  });

  it("retrieves a post by id", (done) => {
    request(api)
      .get("/posts/1")
      .expect(200)
      .expect(
        {
          id: 1,
          content: "user input",
          giphy: "",
          created: "02/06/2022",
          reactions: { love: 0, like: 5, dislike: 2 },
          comments: [],
        },
        done
      );
  });

  it("responds to get /posts/1/comments with status 200", (done) => {
    request(api).get("/posts/1/comments").expect(200, done);
  });

  it("responds to get /posts/17af4l4zs5vim/comments/2hj8fx39csl5104ruk with status 200", (done) => {
    request(api)
      .get("/posts/17af4l4zs5vim/comments/2hj8fx39csl5104ruk")
      .expect(200, done);
  });

  it("responds to a unknown post id with a 404", (done) => {
    request(api).get("/posts/42").expect(404).expect({}, done);
  });

  it("responds to non existing paths with 404", (done) => {
    request(api).get("/no").expect(404, done);
  });

  it("responds to invalid method request with 405", (done) => {
    request(api).post("/").expect(405, done);
  });
});
