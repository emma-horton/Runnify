# Runnify


## Instructions



### Server

#### Install node modules
```bash
pip install node
```

#### Install dependencies
```bash
npm install express
```

```bash
npm install express-session
```

```bash
npm install mocha chai
```

```bash
npm install mongodb
```

### MongoDB
#### Connect to the database
```bash
$HOME/Documents/mongodb/bin/mongod --dbpath $HOME/Documents/mongodb_data --logpath=$HOME/Documents/mongodb/mongodb.log --auth --port $(id -u) &
```

### Start the localhost
#### Start server
```bash
node main.js
```
### LogIn Credentials

#### User1:

#### Username:
```bash
Ruth
```

#### Password:
```bash
thankyouforyourhelp
```

#### User 2:
#### Username:
```bash
Claire
```

#### Password:
```bash
claire
```

#### User3:

#### Username:
```bash
Cameron
```

#### Password:
```bash
me
```

### Important: After the first run, comment out the code for inserting the data at the end of the api.js. It is labelled 'comment me out after the first run'


### To run tests 
#### drop all data in the database 
``` bash 

mongosh --port $(id -u) -u webuser --authenticationDatabase admin -p
use mainDatabase
db.users.drop() 
db.createRuns.drop()
```
```
npm run test
```

