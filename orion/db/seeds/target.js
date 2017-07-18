exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('target').del()
    .then(function() {
      // Inserts seed entries
      return knex('target').insert([{
          "industry": "banking",
          "geography": "North America",
          "role": "junior software developer",
          "comments": "Startup with 10+ employees"
        },
        {
          "industry": "Graphic Design",
          "geography": "China",
          "role": "UX developer",
          "comments": "Large company 5000+"
        },
        {
          "industry": "Accounting",
          "geography": "Russia",
          "role": "Project manager",
          "comments": "Medium company 50+ employees"
        }

      ]);
    });
};
