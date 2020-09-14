const AwsCredModel = require('../models/awscred.model');

exports.saveAwsCreds = (req, res) => {
    AwsCredModel.createCredentials(req.body).then(result => {
        res.status(201).send(result);
    }).catch(reason => {
        res.status(400).send(`Could not save AWS Credentials: ${reason}`);
    });
};

exports.getAwsCreds = (req, res) => {
    AwsCredModel.getCrednetials().then(result => {
        res.status(200).send(result);
    }).catch(reason => {
        res.status(404).send(`Did not find AWS credentials: ${reason}`);
    });
};

exports.deleteAwsCreds = (req, res) => {
    AwsCredModel.deleteCredentials(() => {
        res.status(204).send();
    });
};