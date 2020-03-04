exports.seed = function(knex) {
  return knex('todos').insert([
    {
      title: 'Finish Backend',
      task: 'Build with Node, Express, Postgres',
      setDate: 'Friday',
      user_id: 1
    },
    {
      title: 'Finish Frontend',
      task: 'Build with React',
      setDate: 'Friday',
      user_id: 1
    },
    {
      title: 'Finish UI',
      task: 'Build with HTML and CSS',
      setDate: 'Friday',
      user_id: 1
    },
    {
      title: 'DELETE THIS',
      task: 'DELETE THIS',
      setDate: 'Friday',
      user_id: 1
    }
  ]);
};
