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
    let sqlArr = [
      knex.raw(`select j.*, i.name as industry, concat (s.first_name, ' ', s.last_name) as student_name from jobs j, industry i, student s where j.industry_id = i.id and j.student_id = s.id and student_id = ${req.query.student_id}`),
      knex.raw(`select j.*, i.name as industry from jobs j, industry i where j.industry_id = i.id and j.id = ${req.query.job_id}`)
      // knex('jobs').where('id', req.query.job_id)
    ];
    Promise.all(sqlArr).then((results) => {
      res.render('student-layout', {
        contacts: false,
        selectedContact: false,
        jobs: results[0].rows,
        selectedJob: results[1].rows[0]
      });
    });
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
      selectedJob: false
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
