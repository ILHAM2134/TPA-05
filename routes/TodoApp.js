const todoAppController = require('../controllers/TodoApp-controller');

const TodoApp = require('express').Router();

TodoApp.post('/', todoAppController);

module.exports = TodoApp;
