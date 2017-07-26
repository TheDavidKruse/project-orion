var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET All Staff
router.get('/', function(req, res, next) {
  knex('staff').select().then(staff => res.render('staff-layout', {
    staff
  }));
});


//GET staff by ID
router.get('/:id', function(req, res, next) {
  let sqlArr = [knex('staff').select().where('id', req.params.id),
    knex.raw(`select student_todo.id as st, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo')
  ];
  Promise.all(sqlArr).then(function(result) {
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: result[6],
      selectedContact: false,
      selectedJob: false,
      action: false,
      path: req.path,
      cookies: req.cookies,
      base: req.baseUrl
    })
  })

})

//GET All Students related to staff
router.get('/:id/students', function(req, res, next) {
  let sqlArr = [knex('staff').select().where('id', req.params.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo')
  ];
  Promise.all(sqlArr).then(function(result) {
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: result[6],
      selectedContact: false,
      selectedJob: false,
      action: false,
      path: req.path,
      cookies: req.cookies,
      base: req.baseUrl
    })
  })

})

// DISPLAY Assign TO DO
router.get('/:id/todos/assign/:id', function(req, res) {
  console.log(`in the /edit/${req.params.id} route`);
  let sqlArr = [knex('staff').select().where('id', req.cookies.id),
    knex.raw(`select student_todo.*, student.id as studId, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo').where('id', req.params.id)
  ];
  Promise.all(sqlArr).then(function(result) {
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: result[6],
      selectedContact: false,
      selectedJob: false,
      cookies: req.cookies,
      path: req.path,
      base: req.baseUrl
    });
  });
});


// DISPLAY EDIT TO DO
router.get('/:id/todos/edit/:id', function(req, res) {
  console.log(`in the /edit/${req.params.id} route`);
  let sqlArr = [knex('staff').select().where('id', req.cookies.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo').where('id', req.params.id)
  ];
  Promise.all(sqlArr).then(function(result) {
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: result[6],
      selectedContact: false,
      selectedJob: false,
      cookies: req.cookies,
      path: req.path,
      base: req.baseUrl
    });
  });
});

//TODOs Display add new todo
router.get('/:id/todos/add', function(req, res) {
  console.log('in the /add route');
  let sqlArr = [knex('staff').select().where('id', req.cookies.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo')
  ];
  Promise.all(sqlArr).then(function(result) {
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: false,
      selectedContact: false,
      selectedJob: false,
      cookies: req.cookies,
      path: req.path,
      base: req.baseUrl
    });
  });
});



// TODOS routes
router.get('/:id/todos', function(req, res, next) {
  let sqlArr = [knex('staff').select().where('id', req.params.id),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, student_todo.completed from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.id}`),
    knex('student').select(),
    knex('contacts').select(),
    knex('jobs').select(),
    knex('cohorts').select(),
    knex('todo')
  ];
  Promise.all(sqlArr).then(function(result) {
    res.render('staff-layout', {
      staff: result[0],
      staffHome: result[1].rows,
      students: result[2],
      contacts: result[3],
      jobs: result[4],
      cohorts: result[5],
      todo: result[6],
      selectedContact: false,
      selectedJob: false,
      action: false,
      path: req.path,
      cookies: req.cookies,
      base: req.baseUrl
    })
  })
})


router.post('/assign', function(req, res, next) {
  knex('student_todo').insert(req.body).then(() =>
    res.redirect(`/staff/${req.cookies.id}`)
  )
});


//
// //POST UPDATE staff by ID
// router.post('/:id', function(req, res, next) {
//   knex('staff').update(req.body).where('id', req.params.id).then(staff => res.render('staff', {
//     staff
//   }));
// });

module.exports = router;
