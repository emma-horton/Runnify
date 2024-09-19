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

/////////////////////////////////DEFINE DATA ////////////////////////////////
var sampleUser = [
    {
        _id: new ObjectId('660d40ed0a614dadfa481ebc'),
        userName: 'Andy',
        userPassword: 'TEST',
        weightUser: '74',
        heightUser: '183',
        ageUser: '25',
        goalUser: 'Marathon',
        userEmoji: '🐢'
      },
      {
        _id: new ObjectId('660d40ed0a614dadfa481ebd'),
        userName: 'Ruth',
        userPassword: 'thankyouforyourhelp',
        weightUser: '55',
        heightUser: '165',
        ageUser: '28',
        goalUser: 'Marathon',
        userEmoji: '🌸'
      },
      {
        _id: new ObjectId('660d40ed0a614dadfa481ebe'),
        userName: 'Claire',
        userPassword: 'claire',
        weightUser: '74',
        heightUser: '183',
        ageUser: '25',
        goalUser: '5km PB',
        userEmoji: '🥑'
      },
      {
        _id: new ObjectId('660d40ed0a614dadfa481eb1'),
        userName: 'Cameron',
        userPassword: 'me',
        weightUser: '95',
        heightUser: '160',
        ageUser: '25',
        goalUser: '10km PB',
        userEmoji: '🐱'
      }
    
]

var sampleData =
    [
        {
            _id: new ObjectId('660dcb2948a841ffe7232841'),
            username: 'Claire',
            date: '2024-05-12',
            time: '09:00',
            street: 'Krennerweg ',
            city: 'Munich',
            distance: '19.51',
            pace: '4.50',
            type: 'flat',
            comments: [{
                text: "Hello! I'm looking forward to this run :) ",
                author: 'Andy'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '11.5258892,48.0706467;11.5258892,48.10591719758533;11.578318731517992,48.10591719758533;11.578318731517992,48.0706467;11.5258892,48.0706467',
            weather: { temperature: 16.13, icon: '04d' }
        },
        {
            _id: new ObjectId('660dcb5348a842ffe7332842'),
            username: 'Claire',
            date: '2022-01-30',
            time: '15:00',
            street: 'South Street ',
            city: 'Musselburgh',
            distance: '11.57',
            pace: '4.30',
            type: 'flat',
            comments: [{
                text: "Can't wait!",
                author: 'Andy'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [],
            finished: false,
            coordinates: '-3.05907,55.94335;-3.05907,55.92571475120734;-3.0903497900631147,55.92571475120734;-3.0903497900631147,55.94335;-3.05907,55.94335',
            weather: { temperature: 16.13, icon: '04d' }
        },
        {
            _id: new ObjectId('660e9127b6086ca1721edaad'),
            username: 'Andy',
            date: '2024-08-05',
            time: '12:00',
            street: 'Pilgrim Place ',
            city: 'St Andrews',
            distance: '16.70',
            pace: '4.30',
            type: 'flat',
            comments: [{
                text: "Oh no I can't make it :(",
                author: 'Cameron'
              },
              {
                text: "I love Guardbridge!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [],
            finished: false,
            coordinates: '-2.89437,56.36063;-2.89437,56.33417712681101;-2.9418019879667114,56.33417712681101;-2.9418019879667114,56.36063;-2.89437,56.36063',
            weather: { temperature: 16.13, icon: '04d' }
        },
        {
            _id: new ObjectId('660f15e61201e39734beda26'),
            username: 'Andy',
            date: '2024-07-07',
            time: '09:00',
            street: 'Krennerweg ',
            city: 'Munich',
            distance: '10.95',
            pace: '4.50',
            type: 'flat',
            comments: [{
                text: "Gemrany? That's far away!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Cameron'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [{ name: 'Andy' }],
            finished: false,
            coordinates: '11.5258892,48.0706467;11.5258892,48.08828194879266;11.552103965758997,48.08828194879266;11.552103965758997,48.0706467;11.5258892,48.0706467',
            weather: { temperature: 16.13, icon: '04d' }
        },
        {
            _id: new ObjectId('660fcc9dc3cd712ec463df7e'),
            username: 'Cameron',
            date: '2024-06-13',
            time: '18:00',
            street: 'Princes Street ',
            city: 'Edinburgh',
            distance: '10.90',
            pace: '5.50',
            type: 'flat',
            comments: [{
                text: "Can't Wait!",
                author: 'Cameron'
              },
              {
                text: "Too cold for me",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Cameron'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [],
            finished: false,
            coordinates: '-3.19837,55.95207;-3.19837,55.969705248792664;-3.167083165204418,55.969705248792664;-3.167083165204418,55.95207;-3.19837,55.95207',
            weather: { temperature: 0, icon: '' }
        },
        {
            _id: new ObjectId('660fc675c3cd7bbec463df7f'),
            username: 'Andy',
            date: '2021-07-25',
            time: '15:00',
            street: 'Abc-Straße ',
            city: 'Hamburg',
            distance: '26.94',
            pace: '7.30',
            type: 'flat',
            comments: [{
                text: "Hello everyone, please come to my run!! ",
                author: 'Andy'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '9.98660425,53.5542586;9.98660425,53.607164346377985;10.075065164672568,53.607164346377985;10.075065164672568,53.5542586;9.98660425,53.5542586',
            weather: { temperature: 0, icon: '' }
        },
        {
            _id: new ObjectId('660fcd50c3cd7bbec463d670'),
            username: 'Cameron',
            date: '2023-02-06',
            time: '21:00',
            street: 'Finnieston Street ',
            city: 'Glasgow',
            distance: '5.07',
            pace: '3.40',
            type: 'flat',
            comments: [{
                text: "Wooooooo!",
                author: 'Cameron'
              },
              {
                text: "I'll be there!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' }, { name: 'Cameron' }, { name: 'Ruth' } ],
            finished: false,
            coordinates: '-4.28088,55.86002;-4.28088,55.86883762439633;-4.265273667338059,55.86883762439633;-4.265273667338059,55.86002;-4.28088,55.86002',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660fcd92c3cd7bbec4667f81'),
            username: 'Andy',
            date: '2022-04-06',
            time: '08:00',
            street: 'Aberdeen Western Peripheral Route ',
            city: 'Aberdeen',
            distance: '42.81',
            pace: '5.20',
            type: 'flat',
            comments: [{
                text: "Hello everyone, please come to my run!! ",
                author: 'Andy'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' }, { name: 'Cameron' }, { name: 'Ruth' } ],
            finished: false,
            coordinates: '-2.2234396,57.170817;-2.2234396,57.244885044929184;-2.087732603809985,57.244885044929184;-2.087732603809985,57.170817;-2.2234396,57.170817',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660fce0fc3cd7bbec4636782'),
            username: 'Cameron',
            date: '2023-04-06',
            time: '08:00',
            street: 'New York Cottages ',
            city: 'Leeds',
            distance: '28.32',
            pace: '5.20',
            type: 'flat',
            comments: [{
                text: "This one looks fun.",
                author: 'Claire'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '-1.67082,53.84368;-1.67082,53.89658574637799;-1.5817486990573135,53.89658574637799;-1.5817486990573135,53.84368;-1.67082,53.84368',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660fce4dc3cd67bec463df83'),
            username: 'Claire',
            date: '2023-04-06',
            time: '08:00',
            street: 'Abbey Road ',
            city: 'London',
            distance: '9.53',
            pace: '6.00',
            type: 'flat',
            comments: [],
            participants: [],
            likes: [],
            finished: false,
            coordinates: '0.00585,51.5339;0.00585,51.55153524879267;0.03401015771439311,51.55153524879267;0.03401015771439311,51.5339;0.00585,51.5339',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660dcb2948a841ffe7452841'),
            username: 'Claire',
            date: '2023-03-03',
            time: '09:00',
            street: 'Krennerweg ',
            city: 'Munich',
            distance: '19.51',
            pace: '4.50',
            type: 'flat',
            comments: [{
                text: "This one looks fun.",
                author: 'Claire'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '11.5258892,48.0706467;11.5258892,48.10591719758533;11.578318731517992,48.10591719758533;11.578318731517992,48.0706467;11.5258892,48.0706467'
        },
        {
            _id: new ObjectId('6645cb5348a841ffe7332842'),
            username: 'Andy',
            date: '2022-01-01',
            time: '15:00',
            street: 'South Street ',
            city: 'Musselburgh',
            distance: '11.57',
            pace: '4.30',
            type: 'flat',
            comments: [{
                text: "Wooooooo!",
                author: 'Cameron'
              },
              {
                text: "I'll be there!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' }, { name: 'Cameron' }, { name: 'Ruth' } ],
            finished: false,
            coordinates: '-3.05907,55.94335;-3.05907,55.92571475120734;-3.0903497900631147,55.92571475120734;-3.0903497900631147,55.94335;-3.05907,55.94335'
        },
        {
            _id: new ObjectId('660e9a27b6086451721edaad'),
            username: 'Andy',
            date: '2024-07-05',
            time: '12:00',
            street: 'Pilgrim Place ',
            city: 'St Andrews',
            distance: '16.70',
            pace: '4.30',
            type: 'flat',
            comments: [{
                text: "This one looks fun.",
                author: 'Claire'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '-2.89437,56.36063;-2.89437,56.33417712681101;-2.9418019879667114,56.33417712681101;-2.9418019879667114,56.36063;-2.89437,56.36063'
        },
        {
            _id: new ObjectId('660f15e61201e397345eda16'),
            username: 'Andy',
            date: '2024-10-05',
            time: '09:00',
            street: 'Krennerweg ',
            city: 'Munich',
            distance: '10.95',
            pace: '4.50',
            type: 'flat',
            comments: [],
            participants: [
                {
                    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                    name: 'Andy'
                }
            ],
            likes: [{ name: 'Andy' }],
            finished: false,
            coordinates: '11.5258892,48.0706467;11.5258892,48.08828194879266;11.552103965758997,48.08828194879266;11.552103965758997,48.0706467;11.5258892,48.0706467',
            weather: { temperature: 16.13, icon: '04d' }
        },
        {
            _id: new ObjectId('660fcc9dc3cd23bec463df7e'),
            username: 'Andy',
            date: '2024-09-13',
            time: '18:00',
            street: 'Princes Street ',
            city: 'Edinburgh',
            distance: '10.90',
            pace: '5.50',
            type: 'flat',
            comments: [{
                text: "Wooooooo!",
                author: 'Cameron'
              },
              {
                text: "I'll be there!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' }, { name: 'Cameron' }, { name: 'Ruth' } ],
            finished: false,
            coordinates: '-3.19837,55.95207;-3.19837,55.969705248792664;-3.167083165204418,55.969705248792664;-3.167083165204418,55.95207;-3.19837,55.95207',
            weather: { temperature: 0, icon: '' }
        },
        {
            _id: new ObjectId('660fccf233cd7bbec463df7f'),
            username: 'Andy',
            date: '2024-07-25',
            time: '15:00',
            street: 'Abc-Straße ',
            city: 'Hamburg',
            distance: '26.94',
            pace: '7.30',
            type: 'flat',
            comments: [{
                text: "This one looks fun.",
                author: 'Claire'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '9.98660425,53.5542586;9.98660425,53.607164346377985;10.075065164672568,53.607164346377985;10.075065164672568,53.5542586;9.98660425,53.5542586',
            weather: { temperature: 0, icon: '' }
        },
        {
            _id: new ObjectId('660f2350c3cd7bbec463df80'),
            username: 'Andy',
            date: '2024-09-06',
            time: '21:00',
            street: 'Finnieston Street ',
            city: 'Glasgow',
            distance: '5.07',
            pace: '3.40',
            type: 'flat',
            comments: [{
                text: "Wooooooo!",
                author: 'Cameron'
              },
              {
                text: "I'll be there!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' }, { name: 'Cameron' }, { name: 'Ruth' } ],
            finished: false,
            coordinates: '-4.28088,55.86002;-4.28088,55.86883762439633;-4.265273667338059,55.86883762439633;-4.265273667338059,55.86002;-4.28088,55.86002',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660fcd92c3cd723ec463df81'),
            username: 'Cameron',
            date: '2024-06-06',
            time: '08:00',
            street: 'Aberdeen Western Peripheral Route ',
            city: 'Aberdeen',
            distance: '42.81',
            pace: '5.20',
            type: 'flat',
            comments: [{
                text: "This one looks fun.",
                author: 'Claire'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '-2.2234396,57.170817;-2.2234396,57.244885044929184;-2.087732603809985,57.244885044929184;-2.087732603809985,57.170817;-2.2234396,57.170817',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660fce0fc3cd7bbec233df82'),
            username: 'Claire',
            date: '2024-08-06',
            time: '08:00',
            street: 'New York Cottages ',
            city: 'Leeds',
            distance: '28.32',
            pace: '5.20',
            type: 'flat',
            comments: [{
                text: "Wooooooo!",
                author: 'Cameron'
              },
              {
                text: "I'll be there!",
                author: 'Ruth'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Andy'
              }
           ],
            likes: [ { name: 'Claire' }, { name: 'Andy' }, { name: 'Cameron' }, { name: 'Ruth' } ],
            finished: false,
            coordinates: '-1.67082,53.84368;-1.67082,53.89658574637799;-1.5817486990573135,53.89658574637799;-1.5817486990573135,53.84368;-1.67082,53.84368',
            weather: { temperature: 9.79, icon: '04n' }
        },
        {
            _id: new ObjectId('660fce4dc3cd7bb23463df83'),
            username: 'Claire',
            date: '2024-07-06',
            time: '08:00',
            street: 'Abbey Road ',
            city: 'London',
            distance: '9.53',
            pace: '6.00',
            type: 'flat',
            comments: [{
                text: "This one looks fun.",
                author: 'Claire'
              }
            ],
            participants: [
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Claire'
              },
              {
                avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: 'Ruth'
              }
           ],
            likes: [ { name: 'Ruth' }, { name: 'Andy' } ],
            finished: false,
            coordinates: '0.00585,51.5339;0.00585,51.55153524879267;0.03401015771439311,51.55153524879267;0.03401015771439311,51.5339;0.00585,51.5339',
            weather: { temperature: 9.79, icon: '04n' }
        }

    ]



//////////////////////////////////////////////////////////////////////


//Build our url from our config file info
const config = require('./config-db.js');
const url = process.env.MONGO_URI || `mongodb+srv://emmahorton03:wc8zzJKOdmpMDxE1@reunify.50cg9.mongodb.net/?retryWrites=true&w=majority&ssl=true&appName=reunify`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,  // Enforce SSL
  sslValidate: false, // Don't validate the certificate
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
            collection = client.db().collection(config.collection);
            users = client.db().collection(config.users);
            createRuns = client.db().collection('createRuns');
            console.log("Connected!", conn.s.url.replace(/:([^:@]{1,})@/, ':****@'))
        })
        .catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err); throw err; })
        
        ////////////////////////////COMMENT ME OUT AFTER THE FIRST RUN/////////////////////////////////////////////////////////////////////
        ///*
        // .then(() => {
        //     return users.insertMany(sampleUser)
        //     .then(res => console.log("Users inserted with IDs", res.insertedIds))
        //     .catch(err => { 
        //         console.log("Could not add users ", err.message); 
        //         //For now, ingore duplicate entry errors, otherwise re-throw the error for the next catch
        //         if (err.name != 'BulkWriteError' || err.code != 11000) throw err; 
        //     })
        // })
        // .then(() => {
        //     return collection.insertMany(sampleData)
        //     .then(res => console.log("Data inserted with IDs", res.insertedIds))
        //     .catch(err => { 
        //         console.log("Could not add data ", err.message); 
        //         //For now, ingore duplicate entry errors, otherwise re-throw the error for the next catch
        //         if (err.name != 'BulkWriteError' || err.code != 11000) throw err; 
        //     })
        // })
        //*/
        
        /////////////////////////////////////////////////////////////////////////////////////////////////
        
        
        // tell the server to listen on the given port and log a message to the console (so we can see our server is doing something!)
        .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost:${API_PORT}`)))
        .catch(err => console.log(`Could not start server`, err))
}
module.exports = { runApp }


