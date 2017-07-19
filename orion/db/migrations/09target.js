
exports.up = function(knex, Promise) {
  return knex.schema.createTable('target', function(table){
    table.increments();
    table.string('geography');
    table.string('role');
    table.text('comments');
    table.integer('industry_id').references('id').inTable('industry');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('target');
};
