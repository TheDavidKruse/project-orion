
exports.up = function(knex, Promise) {
  return knex.schema.createTable('student_todo', function(table){
    table.increments();
    table.integer('student_id').references('id').inTable('student');
    table.integer('todo_id').references('id').inTable('todo');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('student_todo');
};
