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

module.exports = router;
