var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//DELETE TODOS
router.post('/delete/:id', function(req, res, next) {
  knex('todo').where('id', req.params.id).del().then(function(todo) {
    res.redirect(`/staff/${req.cookies.id}/todos`);
  });
});


//ADD TODOS
router.post('/', function(req, res) {
  knex('todo').insert(req.body).then(function() {
    knex('todo').select().then(function(todo) {
      res.redirect(`/staff/${req.cookies.id}/todos`);
    });
  });
});


//EDIT TODOS
router.post('/update/:id', function(req, res) {
  knex('todo').update(req.body).where('id', req.params.id).then(function() {
    res.redirect(`/staff/${req.cookies.id}/todos`);
  });
});

//EDIT TODOS POST TO UPDATE STATUS
router.post('/complete/:id', function(req, res, next) {
  console.log("this is the body, ", req.body.staff_id)
  knex.raw(`UPDATE student_todo as st SET completed = 'true' FROM todo as t, student as s WHERE st.id = ${req.params.id} and st.todo_id = t.id and st.student_id = s.id`).then(function(todo) {
    res.redirect(`/staff/${req.body.staff_id}`)
  });
});

router.post('/notcomplete/:id', function(req, res, next) {
  knex.raw(`UPDATE student_todo as st SET completed = 'false' FROM todo as t, student as s WHERE st.id = ${req.params.id} and st.todo_id = t.id and st.student_id = s.id`).then(function(todo) {
    console.log(todo)
    res.redirect(`/staff/${req.body.staff_id}`)
  });
});



module.exports = router;;
