const fs = require("fs");
// const data = require("../data/posts.json");

//functions for reading posts and adding new comments
function readPosts(newPost) {
  let allData;

  // read all files
  fs.readFile("./data/test.json", (err, fileData) => {
    if (err) {
      console.log(err);
    }
    allData = JSON.parse(fileData);
    console.log(allData);
    // push new entry into array
    allData = [...allData, newPost];
    //   write data to file
    fs.writeFile(
      "./data/test.json",
      JSON.stringify(allData, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
  return allData;
}

// should change "test" for "posts" at given time
function addNewComment(newComment, post) {
  fs.readFile("../data/posts.json", (err, fileData) => {
    if (err) {
      console.log(err);
    }

    let dataToUpdate = JSON.parse(fileData);

    let selectedPost = dataToUpdate.filter((hostPost) => {
      return hostPost.id == post;
    })[0];

    const indexOfSelectedPost = dataToUpdate.indexOf(selectedPost);

    const updatedArray = [
      ...dataToUpdate.slice(0, indexOfSelectedPost),
      {
        // here update data value
        ...dataToUpdate[indexOfSelectedPost],
        ["comments"]: [...selectedPost.comments, newComment],
      },
      ...dataToUpdate.slice(indexOfSelectedPost + 1),
    ];
    fs.writeFile(
      "../data/posts.json",
      JSON.stringify(updatedArray, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}

function updateReactions(reaction, post, amount) {
  fs.readFile("../data/test.json", (err, data) => {
    if (err) {
      console.error(err);
    }
    let dataToUpdate = JSON.parse(data);

    const selectedPost = dataToUpdate.filter((hostPost) => {
      return hostPost.id == post;
    })[0];
    console.log(selectedPost.reactions[reaction]);

    const indexOfSelectedPost = dataToUpdate.indexOf(selectedPost);

    const updatedArray = [
      ...dataToUpdate.slice(0, indexOfSelectedPost),
      {
        // here update data value
        //* handle error => what happens if the post doesn't exist? - maybe won't be necessary as this would never happen??
        ...dataToUpdate[indexOfSelectedPost],
        ["reactions"]: {
          ...selectedPost.reactions,
          [reaction]: selectedPost.reactions[reaction] + amount,
        },
      },
      ...dataToUpdate.slice(indexOfSelectedPost + 1),
    ];

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

module.exports = { readPosts, addNewComment, updateReactions };
