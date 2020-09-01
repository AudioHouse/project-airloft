

export function routesConfig(app) {
    app.post('/api/groups', [
        GroupsController.insert
    ]);
}