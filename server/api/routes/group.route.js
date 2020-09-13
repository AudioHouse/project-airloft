const GroupsController = require('../controllers/group.controller');
const AuthValidation = require('../../common/middlewares/auth.validation.middleware');

exports.routesConfig = (app) => {
    app.post('/api/groups', [
        AuthValidation.hasJwtPresent,
        GroupsController.insert
    ]);
    app.get('/api/groups/:groupId', [
        AuthValidation.hasJwtPresent,
        GroupsController.getById
    ]);
    app.patch('/api/groups/:groupId', [
        AuthValidation.hasJwtPresent,
        GroupsController.patchById
    ]);
    app.get('/api/groups', [
        AuthValidation.hasJwtPresent,
        GroupsController.getAllGroups
    ]);
    app.delete('/api/groups/:groupId', [
        AuthValidation.hasJwtPresent,
        GroupsController.removeGroupById
    ]);
}