const logoutRoute = require('express').Router();
const logoutHandler = require('../controllers/logoutHandler');

logoutRoute.post('/', logoutHandler);

module.exports = logoutRoute;
