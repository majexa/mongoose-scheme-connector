'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const db = mongoose.connection;

const ucFirst = function(str) {
  const f = str.charAt(0).toUpperCase();
  return f + str.substr(1, str.length - 1);
};

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = function(dbName, indexFolder) {
  mongoose.connect('mongodb://localhost/' + dbName);
  const normalizedPath = require('path').join(indexFolder, 'schemas');
  return function () {
    return new Promise((resolve, reject) => {
      db.once('open', () => {
        let models = {};
        require('fs').readdirSync(normalizedPath).forEach(function(file) {
          let name = ucFirst(file.replace(/\.js$/, ''));
          models[name] = mongoose.model(name, require(normalizedPath + '/' + file));
        });
        resolve(models);
      });
    });
  };
};

