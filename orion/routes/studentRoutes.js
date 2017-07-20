var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all contacts
*/
router.get('/', function(req, res) {
  let sqlArr = [
    knex('student'),
    knex('todo')
  ];

  Promise.all(sqlArr).then(function(results) {
    res.render('student-layout', {
      contacts: false,
      selectedContact: false,
      jobs: false,
      selectedJob: false,
      students: results[0],
      todos: results[1]
    });
  });
});

router.get('/:id', function(req, res, next) {
  let sqlArr = [knex('staff').select().where('id', req.params.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
  ];
  Promise.all(sqlArr).then(result => res.render('student-layout', {
    staff: result[0],
    staffHome: result[1].rows,
    students: result[2],
    contacts: result[3],
    jobs: result[4],
    selectedContact: false,
    selectedJob: false
  }))
})

router.get('/:id/edit', function(req, res, next) {
  knex('student').select().where('id', req.params.id).then(function(student) {
    console.log(student);
    res.render('student-layout', {
      student
    });
  });
});


router.post('/:id', function(req, res, next) {
  knex('student').update(req.body).where('id', req.params.id)
    .then(function() {
      knex('student').then(function(student) {
        res.render('student-layout', {
          student
        });
      });
    });
});
module.exports = router;
