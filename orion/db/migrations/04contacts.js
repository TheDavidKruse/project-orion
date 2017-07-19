exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', function(table) {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('company_name').notNullable();
    table.string('position');
    table.date('date_meeting');
    table.string('meeting');
    table.text('synopsis').notNullable();
    table.text('follow_up');
    table.integer('student_id').references('id').inTable('student');
    table.integer('industry_id').references('id').inTable('industry');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
