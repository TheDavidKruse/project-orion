var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all contacts
*/
router.get('/', (req, res, next) => {
  knex('contacts').then((contacts) => {
    res.send(contacts);
  });
});

/*
  GET all contacts by student ID
*/
router.get('/student/:id', (req, res, next) => {
  knex('contacts').where('student_id', req.params.id).then((contacts) => {
    res.send(contacts);
  });
});

module.exports = router;

/*
  GET one contact by contact ID
*/
router.get('/:id', (req, res, next) => {
  knex('contacts').where('student_id', req.params.id).then((contacts) => {
    res.send(contacts);
  });
});
