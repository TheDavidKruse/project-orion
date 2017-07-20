var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  SEARCH
*/
router.get('/', (req, res, next) => {
//   console.log('searching using ...', `select * from student
// where lower(concat (first_name, ' ', last_name)) like '%${req.body.student_name}%'`);
console.log('req.body=' ,req.query);
  // knex('student').then(function(students) {
  knex.raw(`select * from student
where lower(concat (first_name, ' ', last_name)) like '%${req.query.student_name}%'`).then(function(students) {
    res.send(students.rows);
  });
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
