var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all students
*/
router.get('/', function(req, res, next) {
  knex('student').then((students) => {
    res.send(students);
  });
});

/*
  GET one student
*/
router.get('/:id', function(req, res, next) {
  let sqlArr = [knex('staff').select().where('id', req.params.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.id}`),
    knex('student').select(),
    // knex('contacts').select().where('student_id', req.params.id),
    knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${req.params.id}`),
    knex('jobs').select().where('student_id', req.params.id),
    knex.raw(`select s.photo_url, s.email, concat (s.first_name, ' ', s.last_name) as student_name, t.*, st.* from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${req.params.id}`)
  ];
  Promise.all(sqlArr).then(function(result) {
    console.log('this is from student routes', result[5].rows)
    res.render('student-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3].rows,
      jobs: result[4],
      students: result[5].rows,
      selectedContact: false,
      selectedJob: false
    })
  })
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
