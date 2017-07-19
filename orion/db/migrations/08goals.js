
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goals', function(table){
    table.increments();
    table.string('milestone');
    table.string('name');
    table.integer('student_id').references('id').inTable('student');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('goals');
};
