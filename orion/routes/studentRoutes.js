var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/*
  GET student profile
*/
router.get('/:id', function(req, res, next) {
  var sqlArr = [knex('student').select().where('id', req.cookies.id),
    knex.raw(`select * from student join student_todo on student.id = student_todo.student_id join todo on todo.id = student_todo.todo_id  where student.id = ${req.cookies.id}`),
    knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id = ${req.cookies.id}`)
  ]
  Promise.all(sqlArr).then((result) =>
    res.render('student-layout', {
      student: result[0],
      todos: result[1].rows,
      jobs: result[2].rows,
      cookies: req.cookies,
      path: req.path,
      base: req.base
    }))
})

router.get('/:id/contacts', (req, res, next) => {
  let sqlArr = [knex('staff').select().where('id', req.cookies.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
    knex('student').select(),
    knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${req.cookies.id}`),
    knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id = ${req.cookies.id}`),
    knex.raw(`select s.photo_url, s.email, concat (s.first_name, ' ', s.last_name) as student_name, t.*, st.* from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${req.cookies.id}`),
    knex('contacts').where('id', req.cookies.id),
    knex.raw(`select j.*, i.name as industry from jobs j, industry i where j.industry_id = i.id and j.id = ${req.cookies.id}`)
  ];
  Promise.all(sqlArr).then(function(result) {
    console.log('this is from job routes, selectedJob=', result[7].rows);
    res.render('student-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      student: result[2],
      contacts: result[3].rows,
      jobs: result[4].rows,
      students: result[5].rows,
      selectedContact: false,
      selectedJob: result[7].rows[0],
      cookies: req.cookies,
      path: req.path,
      base: req.base

    })
  })
});

router.get('/:id/jobs', (req, res, next) => {
  let sqlArr = [knex('staff').select().where('id', req.cookies.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
    knex('student').select(),
    knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${req.cookies.id}`),
    knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id = ${req.cookies.id}`),
    knex.raw(`select s.photo_url, s.email, concat (s.first_name, ' ', s.last_name) as student_name, t.*, st.* from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${req.cookies.id}`),
    knex('contacts').where('id', req.cookies.id),
    knex.raw(`select j.*, i.name as industry from jobs j, industry i where j.industry_id = i.id and j.id = ${req.cookies.id}`)
  ];
  Promise.all(sqlArr).then(function(result) {
    console.log('this is from job routes, selectedJob=', result[7].rows);
    res.render('student-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      student: result[2],
      contacts: result[3].rows,
      jobs: result[4].rows,
      students: result[5].rows,
      selectedContact: false,
      selectedJob: result[7].rows[0],
      cookies: req.cookies,
      path: req.path,
      base: req.base

    })
  })
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
