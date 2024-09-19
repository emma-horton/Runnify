//const { userData } = require('./sampleData/sampleData.js');
//console.log(userData)
//Installing node modules
// const MongoClient = require('mongodb').MongoClient;
// const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require('connect-mongo');
const { ObjectId } = require('mongodb');
const express = require('express');
const session = require('express-session')


//Build our url from our config file info
// Uncomment if running locally 
//const config = require('./config-db.js');
const url = process.env.MONGO_URI || config.url;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsInsecure: false  // Ensure the connection is secure
});
let collection = null; //we will give this a value after we connect to the database
let users = null;

//Set up our app
const app = express();
const API_PORT = process.env.PORT || 24475;

// Configure session to use MongoDB for session store
app.use(session({
  secret: 'i love running',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: url
  }),
  cookie: { secure: false } // Set to true if you're using HTTPS
}));

//middlware
const ensureLoggedIn = (req, res, next) => {
    if (req.session && req.session.userName) {
        // User is logged in, allow them to proceed
        next();
    } else {
        // User is not logged in, redirect to the login page (index.html)
        res.redirect('/index.html');
    }
};


//App.use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(session({
//     secret: "I love running", //used to sign the session ID cookie
//     resave: false, //session save only if modified suring the request
//     saveUninitialized: true, //new sessions saved to store even if not modified 
//     cookie: { secure: false } //cookie can be set over anny connection (does not require HTTPS)
// }));
//app.use((req,res,next)=>{console.log(`AppUse: Session ID is ${req.session.id}`);next();}) //Checks if session is working correctly
app.use('/RunningFeed/cardPage.html', ensureLoggedIn);
app.use('/createRuns/createRuns.html', ensureLoggedIn);
app.use('/statistics/statistics.html', ensureLoggedIn);

//Log in API
app.post("/checkUserCredentials", (req, res) => {
    const { userName, userPassword } = req.body;

    // Make a new session when using the login api to account for different users logging in on the same browser
    req.session.regenerate(err => {
        if (err) {
            console.error("Error creating new session:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        // Query the user information and check if the password is correct
        let query = { userName: userName };
        users.findOne(query)
            .then(entry => {
                if (entry) { //checks if the username is found
                    console.log("The login entry is ", entry);
                    console.log(`User ${userName} has logged in with the password ${userPassword}`);
                    if (entry.userPassword === userPassword) { //checks if the username and password match - sends back 200 success code - adds user data to session
                        req.session.userName = userName;
                        req.session.userPassword = userPassword;
                        console.log(`Session ID for ${userName} is ${req.session.id}`);
                        res.status(200).send("Successfully logged in");
                    } else { //if password does not match send back 401 code
                        console.log("Username exists but the entered password does not match");
                        res.status(401).send("Username and password do not match");
                    }
                } else { //if the username is not found send back 404 code
                    console.log("Username not found");
                    res.status(404).send("User not found");
                }
            })
            .catch(err => {
                console.log("Error:", err.message);
                res.status(500).send("Internal Server Error");
            });
    });
});


//Registration API
app.post("/registerUser", (req, res) => {
    const { userName, userPassword, weightUser, heightUser, ageUser, goalUser, userEmoji } = req.body


    // create query to get the userInformation of the respective user
    let query = { userName: userName }
    users.findOne(query)
        .then(resDB => {
            console.log("The response from the Database reads: ", resDB)
            // if no user found create user
            if (resDB == null) {
                users.insertOne({ userName: userName, userPassword: userPassword, weightUser: weightUser, heightUser: heightUser, ageUser: ageUser, goalUser: goalUser, userEmoji: userEmoji })
                    .then(mod => {
                        console.log(`${userName} inserted with ID, ${mod.insertedId} ${userEmoji}`) //check
                        res.status(200).send(`${userName} registered successfully`) //send back 200 success code
                    })
                    .catch(err => {
                        console.log("Could not register user", err.message)
                    })
            }
            // else the user name is already ttaken
            else {
                console.log("User entered name that was already taken")
                res.status(409).send("user name already taken!") //send back 409 error code
            }
        })

})

app.get('/fetchUserInfo/:userName', function (req, res) {
    users.findOne({ userName: req.params.userName })
        .then(data => {
            if (data) {
                // A user was found, return that user's data
                res.json(data);
            } else {
                // No user found, send an appropriate response
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error('Error fetching user info:', err);
            res.status(500).send('Error');
        });
});

app.post('/createruns/:CITY', function (req, res, next) {
    let city = req.params.CITY;
    let date = req.body.date;
    let time = req.body.time;
    let street = req.body.street;
    let distance = req.body.distance;
    let pace = req.body.pace;
    let type = req.body.type;
    let username = req.session.userName;
    let coordinates = req.body.coordinates
    let weather = req.body.weather

    //console.log(`On createruns: ID is ${req.session.id}`)
    //console.log(date, time, location, distance, pace, type);
    //console.log(collection)
    console.log(date, time, street, city, distance, pace, type, username)


    //Inserting new run into the database
    collection.insertOne({ username: username, date: date, time: time, street: street, city: city, distance: distance, pace: pace, type: type, comments: [], participants: [], likes: [], finished: false, coordinates: coordinates, weather: weather })
        .then(mod => {
            console.log("Data inserted with ID", mod.insertedId);
            res.status(200).send//('Added Run!'); //send success code 200
        })
        .catch(err => {
            console.log("Could not add data ", err.message);
            //For now, ingore duplicate entry errors, otherwise re-throw the error for the next catch
            if (err.name == 'MongoError' || err.code == 11000) {
                res.status(400).send(`Cannot add Run. ID: ${id} already exists.`);
            }
            else {
                console.log(`Cannot add ${id}. Unknown Error.`);
                res.status(400).send(`Cannot add ${id}. Unknown Error.`);
            }
        })
});

// get the data from the database and send it back to the client to create cards
app.get('/api/fetchRuns', (req, res) => {
    createRuns.find({}).toArray()
        .then(data => {
            //console.log('Route data:', data);
            // data.forEach(run => {
            //     run.participants = run.participants.filter(p => p !== null);
            // });
            responseData = [req.session.userName, data];
            res.json(responseData);
        })
        .catch(err => {
            console.error('Error fetching runs:', err);
            res.status(400).send('Error');
        });
});

// get request sorts runs into past and future
app.get('/updateToPastRun', async (req, res) => {
    try {
        const runs = await createRuns.find({}).toArray();
        const currentDate = new Date();

        const updatePromises = runs.map(run => {
            const runDateTime = new Date(`${run.date}T${run.time}`);
            const isFinished = runDateTime < currentDate;

            return createRuns.updateOne(
                { _id: run._id },
                { $set: { finished: isFinished } }
            );
        });

        await Promise.all(updatePromises);

        // Respond with success message
        res.json({ success: true, message: "Runs updated successfully." });
    } catch (err) {
        console.error('Error fetching or updating runs:', err);
        res.status(400).send('Error');
    }
});



app.post('/api/updateRun', (req, res) => {
    const { cardId, likes, participants, comments } = req.body;
    const currentUser = req.session.userName;

    const update = {};

    // update likes 
    if (likes !== null) {
        update.likes = likes;
    }

    // update participants 
    // avoid null
    if (Array.isArray(participants)) {
        update.participants = participants;
    }

    // update comments 
    // not null and not empty array
    if (Array.isArray(comments) && comments.length > 0) {
        // add new comment to the start of the array
        // const newComments = [{ text: comments[0].text, author: currentUser }].concat(comments.slice(1));
        update.comments = comments;
    }

    createRuns.updateOne({ _id: new ObjectId(cardId) }, { $set: update })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).send('Error updating run');
        });
});

// endpoint to update the user information
app.post("/updateUserProfil", (req, res) => {

    const { height, weight, goal } = req.body
    const userName = req.session.userName
    //console.log(height, weight, goal)

    let filter = { userName: userName }
    const updateUser = {
        $set: {
            weightUser: weight,
            heightUser: height,
            goalUser: goal
        },
    }

    users.updateOne(filter, updateUser);
    res.status(200)

})

//Destory session when user logs out
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Logged out successfully");
            console.log("user logged out!!")
        }
    });
});


app.use(express.static('client'))

// // Connecting to the database
// function runApp() {
//   MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//       .then(client => {
//           console.log('Connected to Database');
//           const db = client.db();

//           // Initializing collections
//           const users = db.collection('users');
//           const createRuns = db.collection('createRuns');

//           // Example of setting up a route after a successful connection
//           app.get('/', (req, res) => {
//               users.find().toArray()
//                   .then(results => {
//                       res.json(results);
//                   })
//                   .catch(error => console.error('Error fetching data:', error));
//           });

//           // Start the server
//           app.listen(API_PORT, () => {
//               console.log(`Server running on port ${API_PORT}`);
//           });
//       })
//       .catch(error => {
//           console.error('Failed to connect to the database:', error);
//           process.exit(1); // Exit the process with an error code (1) if the connection fails
//       });
// }

// module.exports = { runApp };


//Connecting to database
function runApp() {
    return client.connect()
        .then(conn => {
            //if the collection does not exist it will automatically be created
            collection = client.db().collection('createRuns');
            users = client.db().collection('users');
            createRuns = client.db().collection('createRuns');
            console.log("Connected!", conn.s.url.replace(/:([^:@]{1,})@/, ':****@'))
        })
        .catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err); throw err; })
        
  
        // tell the server to listen on the given port and log a message to the console (so we can see our server is doing something!)
        .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost:${API_PORT}`)))
        .catch(err => console.log(`Could not start server`, err))
}
module.exports = { runApp }


