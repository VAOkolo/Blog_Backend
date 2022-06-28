const request = require("supertest");

const app = require("../server.js");

describe("API server", () => {
  let api;

  const testNewPost = {
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
      .get("/posts/8dfndsngflag")
      .expect(200)
      .expect(
        {
          id: "8dfndsngflag",
          content: "user input",
          giphy: [],
          created: "02/06/2022",
          reactions: {
            love: 0,
            like: 0,
            dislike: 0,
          },
          comments: [],
        },
        done
      );
  });

  console.log("API", api);

  // it("responds with a status of 201 at /posts/1", (done) => {
  //   request(api).post("/posts/1").expect(201).expect(testNewPost, done);
  // });
});
