const AuthValidation = require('../../common/middlewares/auth.validation.middleware');

exports.routesConfig = (app) => {
    app.post('/api/token', [
        AuthValidation.hasAuthValidFields
    ]);
}