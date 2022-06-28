const fs = require("fs");
const data = require("../data/posts.json");

//functions for reading posts and adding new comments
function readPosts(newPost) {
    let allData;
  
    // read all files
    fs.readFile(data, (err, fileData) => {
      if (err) {
        console.log(err);
      }
      allData = JSON.parse(fileData);
      console.log(allData);
      // push new entry into array
      allData = [...allData, newPost];
      // write data to file
      fs.writeFile(
        data,
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
    fs.readFile(data, (err, fileData) => {
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
        data,
        JSON.stringify(updatedArray, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  }

  module.exports = {readPosts, addNewComment}
