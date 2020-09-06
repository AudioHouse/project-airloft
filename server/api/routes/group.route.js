const GroupsController = require('../controllers/group.controller');

exports.routesConfig = (app) => {
    app.post('/api/groups', [
        GroupsController.insert
    ]);
    app.get('/api/groups/:groupId', [
        GroupsController.getById
    ]);
    app.patch('/api/groups/:groupId', [
        GroupsController.patchById
    ]);
    app.get('/api/groups', [
        GroupsController.getAllGroups
    ]);
    app.delete('/api/groups/:groupId', [
        GroupsController.removeGroupById
    ]);
}