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
        return res.status(404).send(`Group with name ${req.body.groupName} does not exist.`);
    });
}

exports.hasJwtPresent = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] === 'Bearer') {
                req.jwt = jwt.verify(authorization[1], AppConfig.jwt_secret);
                return next();
            } else {
                return res.status(401).send('Request must contain "Bearer" token in header.');
            }
        } catch (err) {
            return res.status(401).send(`Invalid token: ${err}`);
        }
    } else {
        return res.status(401).send('Request does not contain required token in headers.');
    }
}

exports.onlyAdminCanDoThisAction = (req, res, next) => {
    if (req.jwt) {
        if (req.jwt.isAdmin) {
            return next();
        } else {
            return res.status(403).send('Only admin accounts can perform this action');
        }
    } else {
        return res.status(401).send('Request must contain a jwt token');
    }
}

exports.onlySameGroupOrAdminCanDoThisAction = (req, res, next) => {
    if (req.jwt) {
        if ((req.jwt.isAdmin) || (req.params && req.params.groupId && req.params.groupId === req.jwt.id)) {
            return next();
        } else {
            return res.status(403).send('Only an admin or account of the same group can perform this action');
        }
    } else {
        return res.status(401).send('Request must contain a jwt token');
    }
}