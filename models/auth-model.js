const db = require('../database/dbConfig.js');

function find() {
  return db('users').select(
    'id',
    'username',
    'password',
    'firstName',
    'lastName'
  );
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user).returning('id');

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

module.exports = {
  find,
  findBy,
  add,
  findById
};
