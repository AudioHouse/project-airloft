const GroupModel = require('../models/group.model');
const AppConfig = require('../../common/config/env.config');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let passwordHash = crypto.createHash(AppConfig.hashAlgo)
        .update(req.body.password)
        .digest(AppConfig.digestEncoding);
    req.body.password = passwordHash;
    GroupModel.createGroup(req.body).then(result => {
        res.status(201).send({id: result._id});
    });
}

exports.getById = (req, res) => {
    GroupModel.findGroupById(req.params.groupId).then(result => {
        res.status(200).send(result);
    })
}