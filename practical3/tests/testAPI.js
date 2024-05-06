var mocha = require('mocha');
var testServer = require('chai');
var chaiHttp = require('chai-http');
//var chaiPromise = require('chai-as-promised');
//testServer.use(chaiPromise);
testServer.use(chaiHttp);
var expect = testServer.expect;
let api = null;
const myapi = require('../api.js');
const { ObjectId } = require('mongodb');

var objectid;

//////////////////////////////////////////////////////////////////Testing the POST requests on the server///////////////////////////////////////////////////////////////
describe('POST /registerUser', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    it('should be able to register a new user', async function () {
        let data = { userName: 'testing-username123', userPassword: 'password123', weightUser: '100', heightUser: '10', ageUser: '40', goalUser: 'Get Fit', userEmoji: '<3'};
        return testServer.request(api)
        .post("/registerUser")
        .send(data)
        .then(res => {
            expect(res).to.have.status(200); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
    it('should not be able to register a new user if username already exists', async function () {
        let data = { userName: 'testing-username123', userPassword: 'password123', weightUser: '100', heightUser: '10', ageUser: '40', goalUser: 'Get Fit', userEmoji: '<3'};
        return testServer.request(api)
        .post("/registerUser")
        .send(data)
        .then(res => {
            expect(res).to.have.status(409); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
})
describe('POST /checkUserCredentials', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    it('should accept user credentials if they have successfully registered and credentials are correct', async function () {
        let data = { userName: 'testing-username123', userPassword: 'password123'};
        return testServer.request(api)
        .post("/checkUserCredentials")
        .send(data)
        .then(res => {
            expect(res).to.have.status(200); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
    it('should reject user credentials if they have successfully registered but password is incorrect', async function () {
        let data = { userName: 'testing-username123', userPassword: 'incorrect-password'};
        return testServer.request(api)
        .post("/checkUserCredentials")
        .send(data)
        .then(res => {
            expect(res).to.have.status(401); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
    it('should reject user credentials if they have not registered', async function () {
        let data = { userName: 'testing-username555', userPassword: 'password123'};
        return testServer.request(api)
        .post("/checkUserCredentials")
        .send(data)
        .then(res => {
            expect(res).to.have.status(404); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
    it('should reject user credentials if they have not registered', async function () {
        let data = { userName: 'testing-username555', userPassword: 'password123'};
        return testServer.request(api)
        .post("/checkUserCredentials")
        .send(data)
        .then(res => {
            expect(res).to.have.status(404); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
})

describe('POST /createruns/:CITY', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    let user = 'testing-username123';
    it('should be able to create a new run', async function () {
        let data = { username: user, date: '07/02/2024', time: '09:00', street: 'North Street', city: 'St Andrews', distance: '10', pace: '3.5', type: 'Hilly'};
        return testServer.request(api)
        .post(`/createruns/${data.city}`)
        .send(data)
        .then(res => {
            expect(res).to.have.status(200); //check the response status
            expect(res.body).to.be.a('object'); //check the response body
        })
    });
})

//////////////////////////////////////////////////////////////////Testing the GET requests on the server///////////////////////////////////////////////////////////////
describe('GET /api/fetchRuns', async function () {
    before(async () => { api = await myapi.runApp(); });
    after(() => { api.close(); });

    it('should fetch all runs in the database', async function () {
        return testServer.request(api)
            .get('/api/fetchRuns')
            .then(res => {
                expect(res).to.have.status(200); // Check the response status
                expect(res.body).to.be.an('array'); // Check the response body is an array
                
                // Adjusting for the expected structure: [username, runs[]]
                const runs = res.body[1]; // Accessing the runs data
                expect(runs).to.be.an('array'); // Ensuring it's an array as expected
                
                // Now iterating over the runs as intended
                runs.forEach(run => {
                    if (run === null) {
                        // Optionally handle or skip null values
                        return;
                    }
                    console.log(run.date)
                    expect(run).to.be.an('object'); // Each run should be an object
                    expect(run).to.have.property('date'); // Check for the 'date' property
                    //expect(res.body.date).to.equal('07/02/2024');
                    //expect(res.body.time).to.equal('09:00');
                    //expect(res.body.street).to.equal('North Street');
                    //expect(res.body.city).to.equal('St Andrews');
                    //expect(res.body.distance).to.equal('10');
                    //expect(res.body.pace).to.equal('3.5');
                    //expect(res.body.type).to.equal('Hilly');
                    objectid = run._id
                    //console.log(run.date); // Logging the date for verification

                });
            });
    });
});

describe('GET /fetchUserInfo/:userName', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    it('should fetch correct info according specific to the user that is logged in ', async function () {
        let user = 'testing-username123';
        return testServer.request(api)
        .get(`/fetchUserInfo/${user}`)
        .then(res => {
            expect(res).to.have.status(200); //check the response status
            expect(res.body).to.have.property('userName');
            expect(res.body).to.have.property('userPassword');
            expect(res.body).to.have.property('weightUser');
            expect(res.body).to.have.property('heightUser');
            expect(res.body).to.have.property('ageUser');
            expect(res.body).to.have.property('goalUser');
            expect(res.body).to.have.property('userEmoji');
            expect(res.body.userName).to.equal('testing-username123');
            expect(res.body.userPassword).to.equal('password123');
            expect(res.body.weightUser).to.equal('100');
            expect(res.body.heightUser).to.equal('10');
            expect(res.body.ageUser).to.equal('40');
            expect(res.body.goalUser).to.equal('Get Fit');
            expect(res.body.userEmoji).to.equal('<3');

        })
    });
})
describe('GET /updateToPastRun', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    it('should assign all runs with date before todays date to past runs', async function () {
        return testServer.request(api)
        .get('/updateToPastRun')
        .then(res => {
            expect(res).to.have.status(200); //check the response status
        })
    });
})

describe('GET /logout', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    it('should log out user from account', async function () {
        return testServer.request(api)
        .get('/logout')
        .then(res => {
            expect(res).to.have.status(200); //check the response status
        })
    });
})
console.log(objectid)

describe('POST /api/updateRun', async function () {
    before(async () => {api = await myapi.runApp()})
    after(() => {api.close()})
    it('should update an existing run', async function () {
        // Mock data to update an existing run
        const updateData = {
            cardId: objectid, // Assumed to be a valid ObjectId in string format
            likes: 5,
            participants: ['JohnDoe', 'JaneDoe'],
            comments: [{ text: "Great run!", author: "JohnDoe" }]
        };

        // Sending the update request
        return testServer.request(api)
            .post('/api/updateRun')
            .send(updateData)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object'); 

            })
            .catch(err => {
                throw err;
            });
    });
})