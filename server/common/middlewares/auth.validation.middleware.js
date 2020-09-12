const GroupModel = require('../../api/models/group.model');
const AppConfig = require('../config/env.config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.groupName) {
            errors.push('Missing group name field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }
        if (errors.length) {
            return res.status(400).send({ errors: errors.join(',') });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({ errors: 'Missing email and password fields' });
    }
};

exports.verifyCorrectPassword = (req, res, next) => {
    GroupModel.findGroupByName(req.body.groupName).then(result => {
        let hashedRequestPass = crypto.createHash(AppConfig.hashAlgo)
            .update(req.body.password)
            .digest(AppConfig.digestEncoding);
        if (hashedRequestPass === result.password) {
            req.body = {
                id: result._id,
                groupName: result.groupName,
                isAdmin: result.isAdmin,
                provider: 'group-name',
                issuer: 'airloft-auth'
            };
            return next();
        } else {
            return res.status(400).send({error: 'Invalid groupName or password'});
        }
    }).catch(reason => {
        return res.status(404).send(reason);
    });
}

exports.verifyJwtPresent = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] === 'Bearer') {
                req.jwt = jwt.verify(authorization[1], AppConfig.jwt_secret);
                return next();
            } else {
                return res.status(401).body(`Request must contain "Bearer" token in header.`);
            }
        } catch (err) {
            return res.status(403).body(`Invalid token: ${err}`);
        }
    } else {
        return res.status(401).body('Request does not contain required token in headers.').send();
    }
}