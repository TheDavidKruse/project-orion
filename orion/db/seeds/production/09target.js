exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('target').del()
    .then(function() {
      // Inserts seed entries
      return knex('target').insert([{
          "industry_id": 1,
          "geography": "North America",
          "role": "Junior Software Developer",
          "comments": "Startup with 10+ employees"
        },
        {
          "industry_id": 36,
          "geography": "China",
          "role": "UX Developer",
          "comments": "Large company 5000+"
        },
        {
          "industry_id": 1,
          "geography": "Russia",
          "role": "Project Manager",
          "comments": "Medium company 50+ employees"
        }
      ]);
    });
};
