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
  ADD a contact
*/
router.post('/', (req, res, next) => {
  knex('contacts').insert(req.body).then(() => {
    res.send('successfully inserted new row in contacts');
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

/*
  DELETE one contact
*/
router.get('/delete/:id', (req, res, next) => {
  knex('contacts').where('id', req.params.id).del().then(() => {
    res.send('successfully deleted a contact');
  });
});

/*
  GET one contact by contact ID
*/
router.get('/:id', (req, res, next) => {
  knex('contacts').where('id', req.params.id).then((contacts) => {
    res.send(contacts);
  });
});

/*
  EDIT one contact
*/
router.post('/:id', (req, res, next) => {
  knex('contacts').where('id', req.params.id).update(req.body).then(() => {
    res.send('successfully updated a contact');
  });
});

module.exports = router;
