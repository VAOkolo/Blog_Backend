//add posts
// function writePosts(newData) {
  //1. read data,
  //2. grab what we will modify
  //3. write the file
//   let totalPosts = readPosts();// const newPost = getPosts.push(newData);
//   totalPosts = [...totalPosts,newData];
//     // getPosts.push(newData);
//  fs.writeFile("./data/test.json",
//     JSON.stringify(totalPosts, null, 2),
//     (err) => {
//     if (err) {
//     console.log(err);
//         }
//     });

//     return totalPosts;
// }

// function jsonReader(filePath, cb) {
//     fs.readFile(filePath, (err, fileData) => {
//       if (err) {
//         return cb && cb(err);
//       }
//       try {
//         const object = JSON.parse(fileData);
//         return cb && cb(null, object);
//       } catch (err) {
//         return cb && cb(err);
//       }
//     });
//   }
//   jsonReader("./data/test.json", (err, customer) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(data); // => "Infinity Loop Drive"
//   });
