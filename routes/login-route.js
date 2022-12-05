const loginRoute = require('express').Router();
const loginHandler = require('../controllers/loginHandler');

loginRoute.post('/', loginHandler);

module.exports = loginRoute;
