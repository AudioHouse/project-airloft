const GroupsController = require('../controllers/group.controller');
const AuthValidation = require('../../common/middlewares/auth.validation.middleware');

exports.routesConfig = (app) => {
    app.post('/api/groups', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlyAdminCanDoThisAction,
        GroupsController.insert
    ]);
    app.get('/api/groups/:groupId', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlySameGroupOrAdminCanDoThisAction,
        GroupsController.getById
    ]);
    app.patch('/api/groups/:groupId', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlyAdminCanDoThisAction,
        GroupsController.patchById
    ]);
    app.get('/api/groups', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlyAdminCanDoThisAction,
        GroupsController.getAllGroups
    ]);
    app.delete('/api/groups/:groupId', [
        AuthValidation.hasJwtPresent,
        AuthValidation.onlyAdminCanDoThisAction,
        GroupsController.removeGroupById
    ]);
}