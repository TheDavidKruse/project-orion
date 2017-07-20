var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all students
*/
router.get('/', function (req, res, next) {
  knex('student').then((students) => {
    res.send(students);
  });
});

/*
  GET one student
*/
router.get('/:id', function(req, res) {
  knex.raw(`select s.photo_url, s.email, concat (s.first_name, ' ', s.last_name) as student_name, t.*, st.* from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${req.params.id}`).then((students) => {
      res.render('student-layout', {
        contacts: false,
        selectedContact: false,
        jobs: false,
        selectedJob: false,
        students: students.rows,
        todos: false
      });
  });
  // let sqlArr = [
  //   knex('student').where('id', req.params.id),
  //   knex('todo')
  // ];
  //
  // Promise.all(sqlArr).then(function(results) {
  //   res.render('student-layout', {
  //     contacts: false,
  //     selectedContact: false,
  //     jobs: false,
  //     selectedJob: false,
  //     students: results[0],
  //     todos: results[1]
  //   });
  // });
});

router.get('/:id', function(req, res){
  knex('student').where('id', req.params.id).then(function(student) {
    res.render('student-layout', {
      student
    });
  });
});

router.get('/:id/edit', function(req, res, next) {
  knex('student').select().where('id', req.params.id).then(function(student) {
      console.log(student);
    res.render('student-layout', {
      student
    });
  });
});


router.post('/:id', function(req, res, next){
  knex('student').update(req.body).where('id', req.params.id)
  .then(function(){
    knex('student').then(function(student){
        res.render('student-layout', {
          student
        });
      });
});
});
module.exports = router;
