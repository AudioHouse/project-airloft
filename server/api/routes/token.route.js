const AuthValidation = require('../../common/middlewares/auth.validation.middleware');
const TokenController = require('../controllers/token.controller');

exports.routesConfig = (app) => {
    app.post('/api/tokens', [
        AuthValidation.hasAuthValidFields,
        AuthValidation.verifyCorrectPassword,
        TokenController.createToken
    ]);
}