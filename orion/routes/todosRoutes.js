var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET ALL TODOS. */
router.get('/', function(req, res) {
  knex('todo').then(function(todo) {
    res.send(todo);
  });
});
// GET TODOS BY ID
router.get('/:id', function(req, res) {
  knex('todo').where('id', req.params.id).then(function(todo) {
    res.send(todo);
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



//EDIT TODOS POST
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
  console.log(req.body);
  knex('todo').insert(req.body).then(function() {
    knex('todo').select().then(function(todo) {
      res.send(todo);
    });
  });
});


//DELETE TODOS
router.post('/delete/:id', function(req, res, next) {
  knex('todo').where('id', req.params.id).del().then(function(todo) {
    res.send('deleted');
  });
});


module.exports = router;
