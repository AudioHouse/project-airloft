const GroupModel = require('../models/group.model');
const AppConfig = require('../../common/config/env.config');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let passwordHash = crypto.createHash(AppConfig.hashAlgo)
        .update(req.body.password)
        .digest(AppConfig.digestEncoding);
    req.body.password = passwordHash;
    GroupModel.createGroup(req.body).then(result => {
        res.status(201).send({ id: result._id });
    }).catch(reason => {
        res.status(400).send(`Invalid request to create group: ${reason}`);
    });
};

exports.getById = (req, res) => {
    GroupModel.findGroupById(req.params.groupId, true).then(result => {
        res.status(200).send(result);
    }).catch(reaseon => {
        res.status(404).send(`Group not found with id: ${reaseon}`);
    });
};

exports.patchById = (req, res) => {
    GroupModel.patchGroupById(req.params.groupId, req.body).then(result => {
        res.status(204).send();
    }).catch(reason => {
        res.status(400).send(`Could not update group: ${reason}`);
    });
};

exports.getAllGroups = (req, res) => {
    GroupModel.getAllGroups().then(result => {
        res.status(200).send(result);
    }).catch(reason => {
        res.status(500).send(`Could not get all groups: ${reason}`);
    });
};

exports.removeGroupById = (req, res) => {
    // First, ensure group exists
    GroupModel.findGroupById(req.params.groupId, true).then(() => {
        // Then delete group
        GroupModel.deleteGroupById(req.params.groupId).then(result => {
            res.status(204).send(result);
        }).catch(reason => {
            res.status(409).send(`Could not delete group by id: ${reason}`);
        });
    }).catch(reason => {
        res.status(404).send(`Group not found with id: ${reason}`);
    });
};