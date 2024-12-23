![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![Node.js Badge](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![HTML Badge](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=flat)
![CSS Badge](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white&style=flat)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)
![D3 Badge](https://img.shields.io/badge/D3-F9A03C?logo=d3.js&logoColor=white&style=flat)
# **Runnify**

Runnify is a full-stack web application designed to demonstrate advanced programming and software development skills. It showcases the ability to build an interactive platform for organizing social runs and tracking fitness progress.

🌐 **[View the project here](https://runnify-web-f2150b469ce7.herokuapp.com)**  
*Note: Desktop-only access for now*

## **Project Overview**

Developed as part of the 'Masters Programming Projects' module at the University of St Andrews, Runnify was created by a team of five students to explore the development of responsive, user-focused web applications. The project leverages technologies including **JavaScript**, **HTML**, **CSS**, **Node.js**, and **MongoDB**, highlighting expertise in both frontend and backend development.


## **Purpose**

This project serves as a demonstration of technical and collaborative skills in:
- Full-stack development
- Data persistence and user interaction
- Responsive design and usability

Runnify isn’t a live product but a representation of how modern technologies can be used to create engaging digital experiences.
## Features 
### 🔑 **Sign Up and Log In**  
*	Enables users to sign up and log in, granting access to the platform’s features.
<div align="center">
    <img src="images/login_page.png" alt="Login Page" width="400">
    <img src="images/sign_up_page.png" alt="Sign-Up Page" width="400">
</div>

### 🏃‍♂️ **Create Runs**
* Allows users to create new runs by specifying details such as pace, start time, location, and distance.
* Automatically generates an optimized route and provides a weather forecast for the run.
<div align="center">
    <img src="images/create_run.png" alt="Create Run Page" width="500">
</div>

### 📰 **Discover Runs on the Feed Page**
* Displays all available runs with details, including meeting points, pace, mapped routes, participants, likes, and comments.
* Users can join, like, and comment on runs directly from the feed.
* Offers sorting options by pace and distance to better organize the displayed runs.
  
<div align="center">
    <img src="images/feedpage.png" alt="Feed Page" width="500">
</div>

### 📊 **Track Progress with Statistics**
* Provides functionality to update fitness goals and track activity trends over time.
<div align="center">
    <img src="images/statistics.png" alt="Statistics Page" width="500">
</div>

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
