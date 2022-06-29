const fs = require("fs");
function selectedPost(dataToUpdate, id) {
  return dataToUpdate.filter((hostPost) => {
    return hostPost.id == id;
  })[0];
}

function writePosts(newPost) {
  try {
    fs.readFile("./data/test.json", (err, fileData) => {
      if (err) {
        console.log(err);
      }
      let allData = JSON.parse(fileData);
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
  } catch (err) {
    console.log(err);
  }
}

function addNewComment(newComment) {
  fs.readFile("./data/test.json", (err, fileData) => {
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

    fs.writeFile(
      "./data/test.json",
      JSON.stringify(updatedArray, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}
module.exports = { selectedPost, writePosts, addNewComment };
