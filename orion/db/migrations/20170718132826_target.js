
exports.up = function(knex, Promise) {
  return knex.schema.createTable('target', function(table){
    table.increments();
    table.string('industry');
    table.string('geography');
    table.string('role');
    table.text('comments');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('target');
};
