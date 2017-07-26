exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function() {
      // Inserts seed entries
      return knex('todo').insert([{
          "name": "Q1 resume",
          "description": "write up your resume so that we can review it",
        },
        {
          "name": "Q1 video on Q1 project",
          "description": "a 3 minute video on your Q1 project intro",
        },
        {
          "name": "White Walkers",
          "description": "fight the white walkers in winter",
        }
      ]);
    });
};
