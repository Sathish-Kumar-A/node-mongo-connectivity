const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;
const dbUrl = "mongodb+srv://sathishkumar:sathish25@cluster0.mkek8.mongodb.net/test"
module.exports = {dbUrl,MongoClient,mongoDB};