const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    ignoreTables: ['dbmigrations', 'dbmigrations_lock']
  });
};
