
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs',function(table){
    table.increments();
    table.string('company');
    table.string('job_link');
    table.string('industry');
    table.string('location');
    table.string('job_title');
    table.string('hiring_manager');
    table.boolean('direct_contact_manager');
    table.string('recruting_lead');
    table.boolean('direct_recruiting_manager');
    table.date('date_applied');
    table.date('date_phone_interview');
    table.date('date_submit');
    table.date('date_interview');
    table.date('date_followup');
    table.text('comments');
    table.integer('student_id').references('id').inTable('student');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('jobs');
};
