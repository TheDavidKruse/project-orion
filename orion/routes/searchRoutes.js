var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  SEARCH
*/
router.get('/', (req, res, next) => {
  console.log('searching...');
  knex('student').then(function (students) {
    res.send(students);
  });
});

module.exports = router;
