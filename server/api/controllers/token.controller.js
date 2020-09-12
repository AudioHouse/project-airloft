const jwt = require('jsonwebtoken');
const AppConfig = require('../../common/config/env.config');

exports.createToken = (req, res) => {
    try {
        console.log(`INFO: Creating JSON Web Token`)
        let token = jwt.sign(
            req.body,
            AppConfig.jwt_secret,
            { expiresIn: AppConfig.jwt_expiration });
        res.status(201).send({ accessToken: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};

exports.getToken = (req, res) => {
    if (req.jwt) {
        console.log(`INFO: Getting token info for group: ${req.jwt.groupName}`)
        res.status(200).send(req.jwt);
    } else {
        // technically this should never happen because of middleware
        res.status(401).body(`Request must contain a jwt token`).send();
    }
};