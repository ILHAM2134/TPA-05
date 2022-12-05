const todoRoute = require('express').Router();

const {
  getAllTodo,
  getTodoById,
  addTodo,
  deleteTodoById,
  updateTodoById,
  deleteManyTodo,
  clearCollections,
} = require('../controllers/todoHandler');

todoRoute.get('/', getAllTodo);
todoRoute.get('/:id', getTodoById);
todoRoute.post('/', addTodo);
todoRoute.delete('/:id', deleteTodoById);
todoRoute.put('/:id', updateTodoById);
todoRoute.delete('/all/:id', deleteManyTodo);
todoRoute.delete('/', clearCollections);

module.exports = todoRoute;
