import GroupModel from '../models/group.model'
import AppConfig from '../../common/config/env.config'
import crypto from 'crypto';

exports.insert = (req, res) => {
    let passwordHash = crypto.createHash(AppConfig.hashAlgo)
        .update(req.body.password)
        .digest(AppConfig.digestEncoding);
    req.body.password = passwordHash;
    GroupModel.createGroup(req.body).then(result => {
        res.status(201).send({id: result._id});
    });
}