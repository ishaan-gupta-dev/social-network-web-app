const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect('mongodb://localhost/codeial_development');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function () {
    if(env.name == 'development'){
    console.log("Connected to Database - MongoDB-development");
    }
    else{
        console.log("Connected to Database - MongoDB-production");
    }
});

module.exports = db;
