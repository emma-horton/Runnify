![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![Node.js Badge](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![HTML Badge](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=flat)
![CSS Badge](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white&style=flat)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)
![D3 Badge](https://img.shields.io/badge/D3-F9A03C?logo=d3.js&logoColor=white&style=flat)
# Runnify
A social running website applictaion designed to provide everything a runner needs to plan and organise group running activities.
## Purpose 
This project was developed by a group of five students as part of our coursework at the University of St Andrews, specifically to meet the requirements of an assigned task. The full-stack application uses JavaScript, HTML, CSS, Node.js, and MongoDB to build a responsive and interactive platform, enabling communication between users and persistent data storage.

## Features 
*	Users can sign up and log in to the site.
*	Users can view all runs on their feed page, including the meeting point, pace, route displayed on a map, participants, number of likes, and comment details.
*	Users can join a run, like posts, and leave comments on the feed page.
*	Users can create a new run by specifying the desired pace, start time, location, and distance. The app will generate an optimized route and display the expected weather for the run.
*	Users can sort runs on the feed page by pace and distance.
*	Users can update their fitness goals and track their activity trends on the statistics page.
*	![Example Image](images/feed_page "Feed Page")
## Usage
#### 1. Install modules and dependancies
```bash
pip install node
npm install express
npm install express-session
npm install mocha chai
npm install mongodb
```
#### 2. Connect to the database
```bash
$HOME/Documents/mongodb/bin/mongod --dbpath $HOME/Documents/mongodb_data --logpath=$HOME/Documents/mongodb/mongodb.log --auth --port $(id -u) &
```
#### 3. Start server
```bash
node main.js
```
#### (Optional) To run tests 
##### Firstly, drop all data in the database 
``` bash 
mongosh --port $(id -u) -u webuser --authenticationDatabase admin -p
use mainDatabase
db.users.drop() 
db.createRuns.drop()
```
##### Then, run the chai test cases
``` bash 
npm run test
```
## Technologies Used 
* **JavaScript**: For handling the application logic, fetching data from the openWeather and GeoCoding API, and displaying running routes using MapBox.
* **HTML**: For structuring the web application.
* **CSS**: For styling the web application.
* **Node.js**: For processing HTTP requests from the frontend (such as user logins, creating new runs, and liking posts), handling interactions with external APIs (e.g., fetching weather data from OpenWeather and geolocation data from the GeoCoding API), and interacting with MongoDB to store and retrieve persistent data.
* **MongoDB**: For storing the application’s persistent data, including user information (such as usernames, passwords, and preferences), as well as data about the runs (such as route, pace, start time, distance, and participants). It also stores interactions like comments and likes associated with each run.

## Acknowledgements
* [OpenWeather API](https://openweathermap.org/api): For providing weather information to predict conditions for future runs.
* [GeoCoding API](https://openweathermap.org/api/geocoding-api): For supplying the longitude and latitude of the starting point, enabling the plotting of optimal running routes.
* [MapBox](https://docs.mapbox.com/api/overview/): For displaying the running routes on an interactive map.
* [D3](https://d3js.org/): For generating the graphs displayed on the statistics page.
* [SweetAlert2](https://sweetalert2.github.io/): For creating interactive pop-ups and alerts.
* [Sessions](https://www.npmjs.com/package/express-session): For tracking user activity across different pages.
* [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/): For performing automated testing of the application.

## Contributers 
|Name     |
|---------|
| Emma Horton  |
| Teja Garrido |
| Harry Huang  |
| Phil Kolling |
| Reanne Sutton|

