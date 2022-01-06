const { Router } = require('express');
const { createUser, loginUser, universalController } = require('./controller');
const { verifyToken, AllowAccess } = require('./middleware');
const { createValidator, loginValidator } = require('./validation');

const routes = Router();

routes.post('/', createValidator, createUser);
routes.post('/login', loginValidator, loginUser);
routes.get('/', verifyToken, universalController);
routes.get('/onlyadmins', verifyToken, AllowAccess({ role: 'admin' }), universalController);
routes.get('/onlymembers', verifyToken, AllowAccess({ role: 'member' }), universalController);
routes.get('/onlystaffs', verifyToken, AllowAccess({ role: 'staff' }), universalController);
routes.get('/onlyomoalfa', verifyToken, AllowAccess({ username: 'omoalfa' }), universalController);

module.exports = routes;