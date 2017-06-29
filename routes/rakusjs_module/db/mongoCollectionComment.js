/*
/ mongodbの設定を行う
*/
'use strict';
let mongodb = require('mongodb');
const URL = 'mongodb://localhost:27017/rakus_js';

let db;
// Use connect method to connect to the Server
mongodb.MongoClient.connect(URL, function(err, database) {
  db = database;
});

// DBに接続する
let comment = function() {
  return db.collection('comment');
}

module.exports = comment;