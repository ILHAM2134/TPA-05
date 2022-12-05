const registerRoute = require('express').Router();
const registerHandler = require('../controllers/registerHandler');

registerRoute.post('/', registerHandler);

module.exports = registerRoute;
