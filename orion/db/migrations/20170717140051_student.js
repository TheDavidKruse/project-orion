exports.up = function(knex, Promise) {
  return knex.schema.createTable('student', function(table) {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('photo_url');
    table.integer('staff_id').notNullable();
    table.string('password');
    table.string('username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('student');
};
