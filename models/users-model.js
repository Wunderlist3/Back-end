const db = require('../database/dbConfig.js');

function find() {
  return db('users').select('*')
}

function findUser(id) {
  return db('users')
    .where({ id })
    .select('*')
    .first();
}


module.exports = {
  find,
  findUser
}
