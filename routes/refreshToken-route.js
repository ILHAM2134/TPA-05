const refreshTokenRoute = require('express').Router();
const refreshTokenHandler = require('../controllers/refreshTokenHandler');

refreshTokenRoute.post('/', refreshTokenHandler);

module.exports = refreshTokenRoute;
