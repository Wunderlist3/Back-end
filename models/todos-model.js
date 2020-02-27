const db = require('../database/dbConfig.js');

async function addTodo(todo) {
  const [id] = await db('todos').insert(todo).returning('id');

  return findTodo(id);
}

function findTodo(id) {
  return db('todos')
    .where({ id })
    .select('id', 'title', 'task', 'setDate', 'user_id', 'notes', 'completed');
}

function findTodoBy(filter) {
  return db('todos').where(filter);
}

function findTodoById(id) {
  return db('todos')
    .where({ id })
    .first();
}

function updateTodo(id, changes) {
  return db('todos')
    .where({ id })
    .update(changes);
}

function removeTodo(id) {
  return db('todos')
    .where({ id })
    .del();
}


// function findUserTodos(id) {
//   return db('jokes').where('user_id', users.id);
// }


module.exports = {
  addTodo,
  findTodo,
  findTodoBy,
  findTodoById,
  updateTodo,
  removeTodo
};
