const postsData = require("../data/posts.json");
const uniqid = require("uniqid");
const fs = require("fs");
const { selectedPost } = require("../assets/helpers.js");

class Post {
  constructor(data) {
    this.id = uniqid();
    this.content = data.content;
    this.giphy = [];
    this.created = new Date();
    this.reactions = {
      love: 0,
      like: 0,
      dislike: 0,
    };
    this.comments = [];
  }
  static get all() {
    const posts = postsData.map((post) => new Post(post));
    return posts;
  }

  static addNewComment(content, post) {
    const newComment = {
      id: uniqid(),
      content,
      created: new Date(),
    };
//afterwards change paths to posts.json
    fs.readFile("../data/test.json", (err, fileData) => {
      if (err) {
        console.log(err);
      }

      let dataToUpdate = JSON.parse(fileData);

      const selectedPt = selectedPost(dataToUpdate, post);

      const indexOfSelectedPost = dataToUpdate.indexOf(selectedPt);

      const updatedArray = [
        ...dataToUpdate.slice(0, indexOfSelectedPost),
        {
          // here update data value
          ...dataToUpdate[indexOfSelectedPost],
          ["comments"]: [...selectedPt.comments, newComment],
        },
        ...dataToUpdate.slice(indexOfSelectedPost + 1),
      ];

      console.log(updatedArray);
      fs.writeFile(
        "../data/test.json",
        JSON.stringify(updatedArray, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  }

  //   static;
}

const newPost = new Post({ content: "Regardless" });

Post.addNewComment("trying to update our ", 3);
// console.log(Post.all);
