var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all jobs
*/
// router.get('/', (req, res, next) => {
//   knex('jobs').then((jobs) => {
//     res.send(jobs);
//   });
// });

/*
  GET all jobs if no query strings passed
  Otherwise GET one job for a student ID and job ID
*/
router.get('/', (req, res, next) => {
  if(typeof req.query.student_id !== 'undefined' && typeof req.query.job_id !== 'undefined') {
    let sqlArr = [knex('staff').select().where('id', req.cookies.id),
      knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
      knex('student').select(),
      // knex('contacts').select().where('student_id', req.params.id),
      knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${req.query.student_id}`),
      // knex('jobs').select().where('student_id', student_id),
      knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id = ${req.query.student_id}`),
      knex.raw(`select s.photo_url, s.email, concat (s.first_name, ' ', s.last_name) as student_name, t.*, st.* from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${req.query.student_id}`),
      knex('contacts').where('id', 1),
      knex.raw(`select j.*, i.name as industry from jobs j, industry i where j.industry_id = i.id and j.id = ${req.query.job_id}`)
    ];
    Promise.all(sqlArr).then(function(result) {
      console.log('this is from job routes, selectedJob=', result[7].rows);
      res.render('student-layout', {
        staff: result[0],
        staffHome: result[1].rows,
        students: result[2],
        contacts: result[3].rows,
        jobs: result[4].rows,
        students: result[5].rows,
        selectedContact: false,
        selectedJob: result[7].rows[0]
      })
    })
    // let sqlArr = [
    //   knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id = ${req.query.student_id}`),
    //   knex.raw(`select j.*, i.name as industry from jobs j, industry i where j.industry_id = i.id and j.id = ${req.query.job_id}`)
    //   // knex('jobs').where('id', req.query.job_id)
    // ];
    // Promise.all(sqlArr).then((results) => {
    //   res.render('student-layout', {
    //     contacts: false,
    //     selectedContact: false,
    //     jobs: results[0].rows,
    //     selectedJob: results[1].rows[0],
    //     students: false
    //   });
    // });
  } else {
    // Get all jobs
    knex('jobs').then(jobs => res.send(jobs));
  }
});

/*
  ADD a jobs
*/
router.post('/', (req, res, next) => {
  knex('jobs').insert(req.body).then(() => {
    res.send('successfully inserted new row in jobs');
  });
});

/*
  GET all jobs for a student
*/
router.get('/student/:id', (req, res, next) => {
  knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id =  ${req.params.id}`).then(
    jobs => res.render('student-layout', {
      contacts: false,
      selectedContact: false,
      jobs: jobs.rows,
      selectedJob: false,
      students: false
    })
  );
});

/*
  GET one job
*/
router.get('/:id', (req, res, next) => {
  knex('jobs').where('id', req.params.id).then(
    jobs => res.send(jobs)
  );
});

/*
  DELETE one job
*/
router.get('/delete/:id', (req, res, next) => {
  knex('jobs').where('id', req.params.id).del().then(() => {
    res.send('successfully deleted a job');
  });
});

/*
  EDIT one job
*/
router.post('/:id', (req, res, next) => {
  knex('jobs').where('id', req.params.id).update(req.body).then(() => {
    res.send('successfully updated a job');
  });
});

module.exports = router;
