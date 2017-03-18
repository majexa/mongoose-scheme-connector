# Mongoose schemes connector

## Install

    npm install mongoose-scheme-connector

## Usage example

### In your server init script
```javascript
const dbConnect = require('./lib/db');
dbConnect().then((models) => {
  server.decorate('request', 'db', models);
});
```

### ./lib/db sample structure

    ./lib/db/index.js
    ./lib/db/schemas/user.js

#### ./lib/db/index.js contents:

```javascript
module.exports = require('mongoose-scheme-connector')(
  'dbName',
  __dirname
);
```

#### ./lib/db/schemas/user.js contents:
```javascript
module.exports = require('mongoose').Schema({
  registerDate: {
    type: Date,
    default: Date.now
  },
  login: {
    type: String
  }
});
```
