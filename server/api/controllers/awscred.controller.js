const AwsCredModel = require('../models/awscred.model');

exports.saveAWSCreds = (req, res) => {
    AwsCredModel.createCredentials(res.body).then(result => {
        res.status(200).send(result);
    }).catch(reason => {
        res.status(400).send(`Could not save AWS Credentials: ${reason}`);
    });
};

