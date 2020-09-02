const GroupsController = require ('../controllers/group.controller')

exports.routesConfig = (app) => {
    app.post('/api/groups', [
        GroupsController.insert
    ]);
}