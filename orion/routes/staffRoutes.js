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
  knex('staff').select().where('id', req.params.id).then(staff => {
    knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo
join student on student.id = student_todo.student_id
join staff on staff.id = student.staff_id
join todo on todo.id = student_todo.todo_id where staff.id = ${req.params.id}`).then(staffHome => res.render('staff-layout', {
      staffHome: staffHome.rows
    }))
  })

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
