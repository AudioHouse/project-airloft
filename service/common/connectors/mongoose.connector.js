const mongoose = require('mongoose');
const AppConfig = require('../config/env.config');

//Set up default mongoose connection
mongoose.connect(AppConfig.mongoUri, { useNewUrlParser: true });

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.mongoose = mongoose;