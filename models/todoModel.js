const { Schema, model, ObjectId } = require('mongoose');

const todoModel = new Schema({
  activity: {
    type: String,
    required: true,
  },
  start: Date,
  finished_target: Date,
  isDone: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = model('Todo', todoModel);
