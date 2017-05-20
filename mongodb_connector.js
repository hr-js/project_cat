/**
 * mongodb_connector.js
 * mongodbに接続
 * 参考URL
 * http://mongodb.github.io/node-mongodb-native/2.2/tutorials/connect/
 */
const MongoClient = require('mongodb').MongoClient,
			assert			= require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';

// use connect method to connect to the server
MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log('Connected successfully tot server');

	db.close();
})
