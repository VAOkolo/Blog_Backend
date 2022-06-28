# Blog_Backend

### Backend setup
Download the repo or clone it
cd into working directory
run npm init / npm init -y
run npm install
run npm run dev
    - If the server doesn't run check that the below necessary dependencies have been installed:
        - express (npm install express)
        - cors (npm install cors)
        - dot env (npm install dotenv --save)
        - uniqid (npm install uniqid)
        - (@types/node --save-dev)

The muze backend can be located at https://museapp-backend.herokuapp.com/, however if you seek to use our code base to deploy a server at a location of your choosing do the following:
    - download and install the Heroku CLI - https://devcenter.heroku.com/articles/heroku-cli;
    - login to heroku from your local machine - heroku login
    - clone the repository you intend to host
        - heroku git: clone -a <app name>
        - cd into your app
    - to deploy any new changes:
        - git add .
        - git commit -am "make it better"
        - git push heroku master

### API Usage

The Muze API can provide data on users posts comments and reactions:

name	                        method	description
/posts	                        GET	    retrieve all posts
/posts/:post	                GET	    retrieve single post
/posts/post	                    POST	post a single post
/posts/:post/comments/:comment	GET	    retrieve specific comment
/posts/:post/comment	        POST	post comment
/posts/:post/reactions	        PUT	    updates post reaction count

### File Layout

Folders:
Controllers:
    - Contains contain routes and route logic
Models:
    - Contain helper functions for reading and writing data, in addition to logic for adding new comments
Data:
    - Consists of test.json and posts.json
        - test.json - used for internal testing
        - posts.json - active app database

Files:
    - index.js - pulls in server.js logic, fires up server
    - server.js - sets up server and determines that server will utilise routes setup in controllor file posts.js
    - reference.js - reference of unused functions that may or may not be useful to include in our active files

