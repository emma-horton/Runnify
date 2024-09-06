# Runnify
A full-stack web application designed to let users track and share their running routes, times, and pace with the community.

## Purpose 
This project was developed by a group of five students as part of our coursework at the University of St Andrews, specifically to meet the requirements of an assigned task. The full-stack application uses JavaScript, HTML, CSS, Node.js, and MongoDB to build a responsive and interactive platform, enabling communication between users and persistent data storage.

## Features 
*	Users can sign up and log in to the site.
*	Users can view all runs on their feed page, including the meeting point, pace, route displayed on a map, participants, number of likes, and comment details.
*	Users can join a run, like posts, and leave comments on the feed page.
*	Users can create a new run by specifying the desired pace, start time, location, and distance. The app will generate an optimized route and display the expected weather for the run.
*	Users can sort runs on the feed page by pace and distance.
*	Users can update their fitness goals and track their activity trends on the statistics page.
## Usage
#### Install modules and dependancies
```bash
pip install node
npm install express
npm install express-session
npm install mocha chai
npm install mongodb
```
#### Connect to the database
```bash
$HOME/Documents/mongodb/bin/mongod --dbpath $HOME/Documents/mongodb_data --logpath=$HOME/Documents/mongodb/mongodb.log --auth --port $(id -u) &
```
#### Start server
```bash
node main.js
```
### To run tests 
#### drop all data in the database 
``` bash 

mongosh --port $(id -u) -u webuser --authenticationDatabase admin -p
use mainDatabase
db.users.drop() 
db.createRuns.drop()
```
npm run test
```
```

