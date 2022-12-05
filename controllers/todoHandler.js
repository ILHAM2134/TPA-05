const Todo = require('../models/todoModel');

const getAllTodo = async (req, res) => {
  try {
    const todo = await Todo.find().populate('activity', 'user_id');
    res.json({
      msg: 'success get all todo',
      data: todo,
    });
  } catch (err) {
    res.json({
      error: `${err.message}`,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    await Todo.findById(req.params.id).then((todoFound) => {
      if (!todoFound) {
        return res.end('id not found');
      }

      return res.status(200).json(todoFound);
    });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

const addTodo = (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const todo = new Todo(data);

    todo.save();

    res.json({
      msg: `todo added`,
    });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

const deleteTodoById = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
    .then((todo) => {
      if (!todo) return res.status(404).end('todo not found');

      return res.status(200).json({
        msg: `data has deleted`,
        data: todo,
      });
    })
    .catch((err) => res.send({ error: `${err.message}` }));
};

const updateTodoById = async (req, res) => {
  var conditions = { _id: req.params.id };

  const todo = await Todo.updateOne(conditions, req.body).then((todo) => {
    if (!todo) {
      return res.status(404).end('failed to update');
    }
    return res.status(200).json({
      todo,
      message: 'todo updated',
    });
  });
};

async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}

const deleteManyTodo = async (req, res) => {
  await Todo.deleteMany({
    user_id: req.params.id,
  }).then((todo) => {
    if (!todo) {
      return res.status(404).end();
    }
    return res.status(204).json({ doc, message: 'tugas has been deleted' });
  });
};

module.exports = {
  getAllTodo,
  getTodoById,
  addTodo,
  deleteTodoById,
  updateTodoById,
  deleteManyTodo,
  clearCollections,
};
