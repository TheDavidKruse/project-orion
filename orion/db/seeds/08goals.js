exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goals').del()
    .then(function() {
      // Inserts seed entries
      return knex('goals').insert([{
        "milestone": "week1",
        "name": "cold applications and follow up",
        "student_id": 1
      },
      {
        "milestone": "week2",
        "name": "warm applications",
        "student_id": 1
      },
      {
        "milestone": "week3",
        "name": "Email introduction and info interviews",
        "student_id": 2
      },
      {
        "milestone": "week4",
        "name": "meetups",
        "student_id": 1
      },
      {
        "milestone": "week5",
        "name": "interviews",
        "student_id": 1
      },
      {
        "milestone": "week1",
        "name": "meetups",
        "student_id": 2
      },
      {
        "milestone": "week1",
        "name": "cold applications",
        "student_id": 3
      }


    ]);
    });
};
