var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all jobs
*/
router.get('/', (req, res, next) => {
  knex('jobs').then((jobs) => {
    res.send(jobs);
  });
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
  knex('jobs').where('student_id', req.params.id).then((jobs) => {
    res.send(jobs);
  });
});

/*
  GET one job
*/
router.get('/:id', (req, res, next) => {
  knex('jobs').where('id', req.params.id).then((jobs) => {
    res.send(jobs);
  });
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
