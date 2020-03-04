exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'john',
      password: '$2a$12$5QhdlOoo85wuc1cGoXr28ek5hd6YHgq0o9jNAWkHoXNoaIkXoE7ne',
      firstName: 'John',
      lastName: 'Blaze'
    }
  ]);
};
