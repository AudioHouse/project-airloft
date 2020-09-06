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
    }).catch(reason => {
        res.status(400).send(`Invalid request to create group: ${reason}`);
    });
};

exports.getById = (req, res) => {
    GroupModel.findGroupById(req.params.groupId, true).then(result => {
        (result === undefined) ? 
        res.status(404).send(`Group not found with id: ${req.params.groupId}`) :
        res.status(200).send(result);
    });
};

exports.patchById = (req, res) => {
    GroupModel.patchGroupById(req.params.groupId, req.body).then(result => {
        (result.hasOwnProperty('processingError')) ?
        res.status(400).send(`Could not update group: ${result.processingError}`) :
        res.status(204).send();
    });
};

exports.getAllGroups = (req, res) => {
    GroupModel.getAllGroups().then(result => {
        (result.hasOwnProperty('processingError')) ?
        res.status(500).send(`Could not get all groups: ${result.processingError}`) :
        res.status(200).send(result);
    });
}

exports.removeGroupById = (req, res) => {
    // First, ensure user exists
    GroupModel.findGroupById(req.params.groupId, true).then(result => {
        if (result === undefined) {
            res.status(404).send(`Group not found with id: ${req.params.groupId}`);
        } else {
            // Then, delete user if exists
            GroupModel.deleteGroupById(req.params.groupId).then(result => {
                (result.hasOwnProperty('processingError')) ?
                res.status(409).send(`Could not delete group by id: ${result.processingError}`):
                res.status(204).send(result);
            });
        }
    });
};