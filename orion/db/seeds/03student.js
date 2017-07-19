exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student').del()
    .then(function() {
      // Inserts seed entries
      return knex('student').insert([{
          "first_name": "Stephen",
          "last_name": "Eversole",
          "email": "S@E.com",
          "photo_url": "http://imgur.com/a/qN0eA",
          "staff_id": 1,
          "password": "password1",
          "username": "username1",
          "cohorts_id": 1,
          "is_staff": false
        },
        {
          "first_name": "Emit",
          "last_name": "Dutcher",
          "email": "E@D.com",
          "photo_url": "http://imgur.com/a/BCzlG",
          "staff_id": 1,
          "password": "password2",
          "username": "username2",
          "cohorts_id": 1,
          "is_staff": false
        },
        {
          "first_name": "David",
          "last_name": "Kruz",
          "email": "D@K.com",
          "photo_url": "http://imgur.com/a/0O9jP",
          "staff_id": 2,
          "password": "password3",
          "username": "username3",
          "cohorts_id": 2,
          "is_staff": false
        },
        {
          "first_name": "Shu Sia",
          "last_name": "Lukito",
          "email": "S@D.com",
          "photo_url": "http://imgur.com/a/QJ3JU",
          "staff_id": 2,
          "password": "password4",
          "username": "username4",
          "cohorts_id": 2,
          "is_staff": false
        }
      ]);
    });
};
