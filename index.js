const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000
const data = require('./data/posts.json')

//file system essentials
const fs = require('fs');

app.listen(port, () => {
    console.log(`listening at port ${port}`)
    readPosts();
})

//muse posts requests 
//get all posts
app.get('/posts', (req,res) => {
    console.log("test")
    res.send(data);
})
//get specific post
app.get('/posts/:post', (req, res) => {
    const post = parseInt(req.params.post);
    const selectedPost = data.filter((hostPost) => {
       return hostPost.id == post;
    })
    res.send(selectedPost[0]);
})
//post specific post
app.post('posts/post', (req, res) => {
    const data = req.body;
    
    })

//muse comment requests 
//get all comments from parent post
app.get('posts/:post/comments', (req, res) => {

})
//posting a comment
app.post('posts/:post/:comment', (req, res) => {

})

//put request
app.put('/posts/:post/reactions', (req, res) => {

})

function readPosts(){
    let data = fs.readFile('./data/posts.json', (err, fileData) => {
        if(err){
            console.log(err);
        } 
        let readData = JSON.parse(fileData);
        console.log(readData);
        return readData;
    });

    return data;
}


