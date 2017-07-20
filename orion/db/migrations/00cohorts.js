
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(table){
    table.increments();
    table.string('cohort_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cohorts');
};
