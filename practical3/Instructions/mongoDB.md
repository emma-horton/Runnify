# Mongo DB

## Install MongoDB

```bash
cd ~
```

```bash
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel90-7.0.0.tgz

```

```bash
tar xzvf mongodb-linux-x86_64-rhel90-7.0.0.tgz

```

```bash
mv mongodb-linux-x86_64-rhel90-7.0.0 Documents/mongodb

```


```bash
mkdir $HOME/Documents/mongodb_data

```


```bash
$HOME/Documents/mongodb/bin/mongod --dbpath $HOME/Documents/mongodb_data --logpath=$HOME/Documents/mongodb/mongodb.log --auth --port $(id -u) &

```

```bash
mongosh --port $(id -u)

```


```bash
use admin
var user = {
  "user" : "admin",
  "pwd" : "admin", 
  roles : [ { "role" : "userAdminAnyDatabase", "db" : "admin" } ]
}
db.createUser(user);

```

```bash
exit

```


```bash
mongosh --port $(id -u) -u admin --authenticationDatabase admin -p

```

```bash
use admin
var user = {
  "user" : "webuser",
  "pwd" : "webuser",
  "roles" : [{ "role" : "readWriteAnyDatabase", "db" : "admin" }]
}
db.createUser(user);

```

```bash

exit
```

```bash

id -u
```


### Run MongoDB

```bash
$HOME/Documents/mongodb/bin/mongod --dbpath $HOME/Documents/mongodb_data --logpath=$HOME/Documents/mongodb/mongodb.log --auth --port $(id -u) &

```
### See Database
```bash

mongosh --port $(id -u) -u webuser --authenticationDatabase admin -p
```

### specify which Database to use
```bash
use <NAME DATABASE>

```
### show Collections of Database
```bash

show collections
```
### See all entries of collection

```bash
db.<collection Name>.find({})

```

### Config file
```bash
(function() {
	const db_info = {url:'localhost',
                        username: 'webuser',
                        password: 'webuser',
                        port: <YOUR PORT NUMBER>,
						database: 'mainDatabase',
                        collection: 'createRuns',
                        users: 'users'};

	const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());
```

### Drop a a collection 
```bash
db.<COLLECTION NAME>.drop()
```

### Add runs to the createRuns database 
```bash
 db.createRuns.insertMany([
    {username: 'Emma',
    date: '2022-04-11',
    time: '11:00',
    street: 'London Road ',
    city: 'Dalkeith',
    distance: '26.46',
    pace: '6.10',
    type: 'flat',
    comments: [],
    participants: [],
    likes: [],
    finished: false,
    coordinates: '-3.06819,55.89203;-3.06819,55.93611812198166;-2.990093979026206,55.93611812198166;-2.990093979026206,55.89203;-3.06819,55.89203'
  },

    {username: 'Emma',
    date: '2019-04-08',
    time: '17:00',
    street: 'New Grove Street ',
    city: 'Wilkes-Barre',
    distance: '5.35',
    pace: '3.00',
    type: 'flat',
    comments: [],
    participants: [],
    likes: [],
    finished: false,
    coordinates: '-75.90122,41.22724;-75.90122,41.23605762439633;-75.8895745877271,41.23605762439633;-75.8895745877271,41.22724;-75.90122,41.22724'
  }

])
```

### Testing the application 
#### Run in terminal 
``` bash
npm run test
```
#### note: will need to drop users database to run tests again
``` bash 
db.users.drop()
```