const mongoose = require('../../common/connectors/mongoose.connector').mongoose;
const Schema = mongoose.Schema;

const awsCredScehema = new Schema({
    accessKeyId: {
        type: String,
        required: [true, 'AWS System Credentials must have an access key id']
    },
    secretAccessKey: {
        type: String,
        required: [true, 'AWS System Credentials must have a secret access key']
    },
    region: {
        type: String,
        required: [true, 'AWS System Credentials must specifiy a cloud region']
    }
});

awsCredScehema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
awsCredScehema.set('toJSON', {
    virtuals: true
});

const AwsCreds = mongoose.model('AwsCreds', awsCredScehema);

exports.createCredentials = (credData) => {
    return new Promise((resolve, reject) => {
        console.log(`INFO: Persisting new aws credentials: ${JSON.stringify(credData)}`);
        const creds = new AwsCreds(credData);
        AwsCreds.exists().then(exists => {
            if(exists) {
                reject('AWS Credentials already exist for the system.');
                return;
            } else {
                creds.save().then(result => {
                    resolve(result);
                }).catch(reason => {
                    console.log(`ERROR: Could not save system AWS credentials: ${reason}`);
                    reject(reason);
                });
            }
        });
    });
};

exports.getCrednetials = () => {
    return new Promise((resolve, reject) => {
        console.log('INFO: Getting System AWS Credentials');
        AwsCreds.find().then(result => {
            if (result.length > 0) {
                resolve(result[0]);
            } else {
                reject('Did not find any system aws credentials');
            }
        });
    });
};

exports.deleteCredentials = (callback) => {
    console.log(`INFO: Deleting system AWS credentials.`);
    AwsCreds.deleteMany({}, callback);
}