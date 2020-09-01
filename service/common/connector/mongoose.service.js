import mongoose from 'mongoose';

let count = 0;
const MONGO_URI = 'mongodb://mongo:27017/rest-tutorial';
const RETRY_MILLIS = 5000;
const OPTIONS = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    //geting rid off the depreciation errors
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectWithRetry = () => {
    console.log('Connecting to MongoDB with retry of ');
    mongoose.connect(MONGO_URI, OPTIONS).then(() => {
        console.log("Successfully connected to MongoDB");
    }).catch(error => {
        console.log('Could not connect to MongoDB: ' + str(error));
        console.log(`Retrying connection after ${RETRY_MILLIS} seconds`, ++count);
        setTimeout(connectWithRetry, RETRY_MILLIS);
    });
}

connectWithRetry();

exports.mongoose = mongoose;