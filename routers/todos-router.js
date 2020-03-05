const router = require('express').Router();

const Todos = require('../models/todos-model.js');

const authenticate = require('../middleware/auth-middleware.js');

const requireTodo = require('../middleware/requireTodo-middleware.js');

// ADD TODO
router.post('/add', authenticate, requireTodo, (req, res) => {
  const todo = req.body;

  Todos.addTodo(todo)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to add todo', err });
    });
});

// GET USER LIST OF TODOS
router.get('/list', authenticate, async (req, res) => {
  const { user_id } = req.body;
  try {
    const todo = await Todos.findTodoBy({ user_id });
    if (todo.length > 0) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: 'Invalid user_id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve todo list' });
  }

  // Todos.findTodoBy({ user_id })
  //   .then(todos => {
  //     res.status(200).json(todos);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: 'Failed to retrieve todolist', err });
  //   });
});

// GET TODO BY ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const todo = await Todos.findTodoById(req.params.id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve todo', err });
  }
});

// UPDATE TODO BY ID
router.put('/update/:id', authenticate, async (req, res) => {
  try {
    const todo = await Todos.updateTodo(req.params.id, req.body);
    if (todo) {
      res.status(200).json({ message: `${todo} record updated` });
    } else {
      res.status(404).json({ message: 'Todo could not be found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update todo', err });
  }
});

// DELETE TODO BY ID
router.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const count = await Todos.removeTodo(req.params.id);
    // console.log('count', count);
    if (count > 0) {
      res.status(200).json({ message: 'Todo deleted' });
    } else {
      res
        .status(404)
        .json({ message: `Could not find todo with given id: ${req.params.id}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Failed to delete todo',
      err
    });
  }
});

module.exports = router;
