const config = require('./common/config/env.config.js');
const groupRoutes = require('./api/routes/group.route');
const groupModel = require('./api/models/group.model');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require ('crypto');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
groupRoutes.routesConfig(app);

// create admin account on application startup
let admin = config.defaultAdminAccount;
admin.password = crypto.createHash(config.hashAlgo)
    .update(admin.password).digest(config.digestEncoding);
groupModel.createGroup(admin).then((result) => {
    (result.hasOwnProperty('processingError')) ?
    console.log('Admin account already exists') :
    console.log(`Created admin account`)
});

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});