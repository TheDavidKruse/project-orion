var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  SEARCH by student's name
*/
router.get('/:staff_id', (req, res, next) => {
  // let sqlArr = [
    // knex('staff').where('id', 1),
    // knex.raw(`select * from student where lower(concat (first_name, ' ', last_name)) like '%${req.query.student_name}%'`)
  // ];
  let sqlArr = [knex('staff').select().where('id', req.params.staff_id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.staff_id}`),
    knex.raw(`select * from student where lower(concat (first_name, ' ', last_name)) like '%${req.query.student_name}%'`),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo')
  ];
  Promise.all(sqlArr).then(function(result) {
    console.log(result[2])
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2].rows,
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: result[6],
      selectedContact: false,
      selectedJob: false
    })
  })
  // Promise.all(sqlArr).then(function(results) {
  //   // res.send(students.rows);
  //   res.render('staff-layout', {
  //     staff: results[0],
  //     students: results[1]
  //   });
  // });
});

// get student by first name
router.get('/student', function(req, res) {
      if (req.query.first_name && req.query.last_name) {
        knex('student').where(('first_name', 'last_name'), (req.query.first_name, req.query.last_name)).then(function(student) {
          console.log('finding student by name', student);
          res.send(student[0]);
        });
      } else if (req.query.first_name) {
        knex('student').where(('first_name'), (req.query.first_name)).then(function(student) {
          res.send(student[0]);
        });
      } else if (req.query.last_name) {
        knex('student').where(('last_name'), (req.query.last_name)).then(function(student) {
          res.send(student[0]);
        });
      } else {
        console.log('That aint no student of mine');
      }
      res.render('student-search', {
        student
      });
    });

    module.exports = router;
