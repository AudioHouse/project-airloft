const GroupModel = require('../models/group.model');
const AppConfig = require('../../common/config/env.config');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let passwordHash = crypto.createHash(AppConfig.hashAlgo)
        .update(req.body.password)
        .digest(AppConfig.digestEncoding);
    req.body.password = passwordHash;
    GroupModel.createGroup(req.body).then(result => {
        (result === undefined) ?
        res.status(400).send(`Invalid request to create group`) :
        res.status(201).send({id: result._id});
    });
}

exports.getById = (req, res) => {
    GroupModel.findGroupById(req.params.groupId, true).then(result => {
        (result === undefined) ? 
        res.status(404).send(`Group not found with id: ${req.params.groupId}`) :
        res.status(200).send(result);
    });
}