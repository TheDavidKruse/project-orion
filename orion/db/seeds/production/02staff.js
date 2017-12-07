exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('staff').del()
    .then(function() {
      // Inserts seed entries
      return knex('staff').insert([{
          "first_name": "Maria",
          "last_name": "Montoya",
          "email": "M@M.com",
          "photo_url": null,
          "password": "password1",
          "username": "username1",
          "is_staff": true
        },
        {
          "first_name": "John",
          "last_name": "Armbuster",
          "email": "J@A.com",
          "photo_url": null,
          "password": "password2",
          "username": "username2",
          "is_staff": true
        }

      ]);
    });
};
