# Server for Muze App

## Project description

This is the server that Muze App uses. Deployed at: https://museapp-backend.herokuapp.com/posts

## Installation

- Download or clone the repo
- In terminal, run `npm i` to install required dependencies
- In order to start the server, run in terminal `npm run dev`
- If the server doesn't run check that the below necessary dependencies have been installed:
  - express (or to install run `npm install express`)
  - cors (or to install run `npm install cors`)
  - dot env (or to install run `npm install dotenv --save`)
  - uniqid (or to install run `npm install uniqid`)

## API Usage

The Muze API can provide data on users posts comments and reactions:

### Available Routes

Below are the routes available for use with the right usage:

- `/posts` GET method which will retrieve all posts
- `/posts/:post` GET method. Will retrieve single post taking the post id as parameter. If id of post is "1" then it should be used like: `/posts/1`
- `/posts/post` POST method which will post a new post. In the body it will receive the `{"content": "[message input by user]"}` then retrieve a new post with a randomly generated id (generated with uniqid npm package), created date, a reactions object containing 3 properties for the 3 available emojis which are "love", "like", "dislike", and an empty comments array
- `/posts/:post/comments/:comment` GET method will take the post id and comment id in the path then retrieve the information for the specific comment
- `/posts/:post/comment` POST method takes the post id and will generate a new post comment containing the message by the user.`{"content": "[comment input by user]"}`
- `/posts/:post/reactions` PUT method that updates post reaction and adds 1 to existing number

## Layout

### Folders:

- Controllers: - Contains router
- Models: - Contains Post and Comment models
- Data: - Contains JSON file that will store data
- Assets: Contains helper functions

### Files:

- index.js - pulls in server.js logic, fires up server
- server.js - sets up server and determines that server will utilise routes setup in controller file
- posts.js - includes router

## Technologies

- Node JS
- Express
- Nodemon
- Cors
- Uniqid
- Jest and Supertest for testing API
