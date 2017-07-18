
exports.up = function(knex, Promise) {
  return knex.schema.createTable('industry', function(table){
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('industry');
};
