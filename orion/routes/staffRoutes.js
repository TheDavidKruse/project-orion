var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET All Staff
router.get('/', function(req, res, next) {
  knex('staff').select().then(staff => res.render('staff-layout', {
    staff
  }));
});

router.get('/home', (req,res,next) => {
  res.render('components/filler')
})


//GET staff by ID
router.get('/:id', function(req, res, next) {
  knex('staff').select().where('id', req.params.id).then(staff => knex('todo').select().then(todos => res.render('staff-layout', {
    staff,
    todos
  })));
});

//GET All Students related to staff
router.get('/:id/students', function(req, res, next) {
  knex.raw(`select concat (staff.first_name,' ', staff.last_name) as staff_name, concat (student.first_name,' ', student.last_name) as student_name, student.email as student_email
from student, staff
where staff.id = student.staff_id and student.staff_id = ${req.params.id}`).then(staff => res.render('staff', {
    staff: staff.rows
  }))
})

//POST UPDATE staff by ID
router.post('/:id', function(req, res, next) {
  knex('staff').update(req.body).where('id', req.params.id).then(staff => res.render('staff', {
    staff
  }));
});





module.exports = router;
