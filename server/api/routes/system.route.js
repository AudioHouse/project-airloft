const AuthValidation = require('../../common/middlewares/auth.validation.middleware');
const SystemController = require('../controllers/system.controller');

exports.routesConfig = (app) => {
    app.post('/api/system/awscreds', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlyAdminCanDoThisAction,
        SystemController.saveAwsCreds
    ]);
    app.get('/api/system/awscreds', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlyAdminCanDoThisAction,
        SystemController.getAwsCreds
    ]);
}

