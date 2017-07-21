var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET ALL TODOS. */
router.get('/', function(req, res) {
  knex('todo').then(function(todo) {
    res.render('staff-layout', {
      todo: todo,
      action: 'list'
    });
  });
});

// DISPLAY EDIT TO DO
router.get('/edit/:id', function (req, res) {
  console.log(`in the /edit/${req.params.id} route`);
  let sqlArr = [knex('staff').select().where('id', 1),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = 1`),
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
      action: 'add'
    });
  });
});

// DISPLAY ADD TO DO
router.get('/add', function (req, res) {
  console.log('in the /add route');
  let sqlArr = [knex('staff').select().where('id', 1),
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = 1`),
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
      action: 'add'
    });
  });
});


//DELETE TODOS
router.get('/delete/:id', function(req, res, next) {
  knex('todo').where('id', req.params.id).del().then(function(todo) {
    res.redirect(`/staff/1`);
  });
});


//GET ALL TODOS FOR STUDENT
router.get('/student/:id', function(req, res) {
  knex.raw(`select * from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${req.params.id}`).then(function(todo) {
    res.send(todo.rows);
  });
});

//EDIT TODOS GET
router.get('/:id/edit', function(req, res, next) {
  knex('todo').select().where('id', req.params.id).then(function(todo) {
    console.log(todo);
    res.send(todo);
  });
});

//EDIT TODOS post
router.post('/update/:id', function (req, res, next) {
  knex('todo').update(req.body).where('id', req.params.id).then(function (todo) {
    knex('todo').select().then(function (todos) {
      res.redirect(`/staff/1`);
    });
  });
});

//EDIT TODOS POST TO UPDATE STATUS
router.post('/complete/:id', function(req, res, next) {
  console.log("this is the body, ", req.body.staff_id)
  knex('todo').update('status', 'complete').where('id', req.params.id)
    .then(function(todo) {
      console.log('this is todos', todo)
      res.redirect(`/staff/${req.body.staff_id}`)
    });
});

router.post('/notcomplete/:id', function(req, res, next) {
  knex('todo').update('status', 'not complete').where('id', req.params.id)
    .then(function(todo) {
      console.log(todo)
      res.redirect(`/staff/${req.body.staff_id}`)
    });
});


//ADD TODOS
router.post('/', function(req, res) {
  req.body.status = 'not complete',
  knex('todo').insert(req.body).then(function() {
    knex('todo').select().then(function(todo) {
      res.redirect(`/staff/1`);
    });
  });
});



// GET TODOS BY ID
router.get('/:id', function(req, res) {
  knex('todo').where('id', req.params.id).then(function(todo) {
    res.send(todo);
  });
});


module.exports = router;
