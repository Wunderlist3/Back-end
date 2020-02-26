exports.up = function(knex) {
  return (
    knex.schema
      // Users Table
      .createTable('users', users => {
        users.increments();

        users
          .string('username', 128)
          .notNullable()
          .unique();

        users.string('password', 128).notNullable();
        users.string('firstName', 128);
        users.string('lastName', 128);
      })

      // Todos Table
      .createTable('todos', todos => {
        todos.increments();
        todos.string('title', 256).notNullable();
        todos.string('task', 256).notNullable();
        todos.string('setDate', 128).notNullable();

        todos
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('users.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        
        todos.string('notes', 256);
        
        todos
          .boolean('completed')
          .notNullable()
          .defaultTo(false);
      })
  );
};

exports.down = function(knex) {};
