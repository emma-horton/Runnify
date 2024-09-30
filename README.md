![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![Node.js Badge](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![HTML Badge](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=flat)
![CSS Badge](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white&style=flat)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)
![D3 Badge](https://img.shields.io/badge/D3-F9A03C?logo=d3.js&logoColor=white&style=flat)
# Runnify
**Runnify** is a full-stack web application developed to help runners organize social running activities and track their progress over time.

[Click here to try it out](https://runnify-web-f2150b469ce7.herokuapp.com)  
*Currently only available on desktop.*

<a href="#tryout-section">
    <button style="background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
        Click here for login details
    </button>
</a>

## Purpose 
This project was developed by a group of five students as part of our coursework for the 'Masters Programming Projects' module at the University of St Andrews. The full-stack application uses JavaScript, HTML, CSS, Node.js, and MongoDB to build a responsive and interactive platform, enabling communication between users and persistent data storage.

## Features 
### Login and sign up page 
*	Sign up and log in functionality is available, allowing access to the site.
<figure style="display: flex; flex-direction: column; align-items: center;">
    <!-- Flex container for images only -->
    <div style="display: flex; justify-content: center;">
        <img src="images/login_page.png" alt="Login Page" width="400">
        <img src="images/sign_up_page.png" alt="Sign Up Page" width="400">
    </div>
    <!-- Caption below images -->
<!--     <figcaption>Figure 1: User login and sign in page.</figcaption> -->
</figure>

### Create runs page 
* New runs can be created by specifying pace, start time, location, and distance. The app generates an optimized route and provides the expected weather forecast for the run.
  
<figure>
    <img src="images/create_run.png" alt="Create Run Page" width="500">
<!--     <figcaption>Figure 2: User create run page.</figcaption> -->
</figure>

### Feed page 
* The feed page displays all runs, including meeting points, pace, routes on a map, participants, likes, and comments.
* Runs can be joined, liked, and commented on directly from the feed page.
* Sorting options by pace and distance are available to organize the runs on the feed.
  
<figure style="text-align: center; display: block;">
    <img src="images/feedpage.png" alt="Feed Page" width="500">
    <!-- <figcaption>Figure 3: The main feed page showing user activity.</figcaption> -->
</figure>

### Statistics page 
* Fitness goals can be updated, and activity trends tracked through the statistics page.
<figure>
    <img src="images/statistics.png" alt="Statistics Page" width="500">
<!--     <figcaption>Figure 4: User profile page.</figcaption> -->
</figure>

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
* **JavaScript**: Handles the application logic, retrieves data from the OpenWeather and GeoCoding APIs, and displays running routes using MapBox.
* **HTML**: Structures the web application and ensures a well-organized layout.
* **CSS**: Provides styling and layout for a visually appealing and responsive user interface.
* **Node.js**: Processes HTTP requests from the frontend (e.g., user logins, creating new runs, liking posts) and manages interactions with external APIs like OpenWeather and GeoCoding. It also facilitates communication with MongoDB for storing and retrieving data.
* **MongoDB**: Stores persistent data, including user information (e.g., usernames, passwords, preferences) and run-related data (e.g., route, pace, start time, distance, participants), as well as interactions like comments and likes.

## Acknowledgements
* [OpenWeather API](https://openweathermap.org/api): Provides weather information used to predict conditions for future runs.
* [GeoCoding API](https://openweathermap.org/api/geocoding-api): Supplies the longitude and latitude of the starting point, allowing the plotting of optimal running routes.
* [MapBox](https://docs.mapbox.com/api/overview/): Displays the running routes on an interactive map for users to visualize their paths.
* [D3](https://d3js.org/): Generates the graphs that are shown on the statistics page.
* [SweetAlert2](https://sweetalert2.github.io/): Creates interactive pop-ups and alerts throughout the application.
* [Sessions](https://www.npmjs.com/package/express-session): Tracks user activity across different pages to maintain session state.
* [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/): Perform automated testing to ensure the application’s functionality and reliability.

## Contributers 
|Name     |Contributions|
|---------|---------|
| Teja Garrido | Graphs Statistics, Styling of Pages. |
| Emma Horton  | Testing Server Endpoints, Calendar for Runs, Database Setup, Styling of Pages, Create endpoints on server. |
| Harry Huang  | Running Feed. |
| Phil Kolling | External weather API, Map API, Algorithm, Database Setup, Register Page, Login Page, Create endpoints on server, Helper Functions. |
| Reanne Sutton|External weather API, Database Setup, Register Page, Login Page, Styling of Pages, Create endpoints on server, Sessions. |

## Login Details
- **Username**: Claire
- **Password**: claire

## Project Grade 
Grade: 19/20 (95%)
