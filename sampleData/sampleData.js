let sampleData =
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
            finished: true,
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
            finished: true,
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
            finished: true,
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
            finished: true,
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


let sampleUser = [
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
            _id: ObjectId('660d40ed0a614dadfa481ebe'),
            userName: 'Cameron',
            userPassword: 'me',
            weightUser: '95',
            heightUser: '160',
            ageUser: '25',
            goalUser: '10km PB',
            userEmoji: '🐱'
          }
        
    ]

  