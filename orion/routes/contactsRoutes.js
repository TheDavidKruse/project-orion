var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  ADD a contact
*/
router.post('/', (req, res, next) => {
  knex('contacts').insert(req.body).then(() => {
    res.send('successfully inserted new row in contacts');
  });
});

/*
  DELETE one contact
*/
router.post('/delete/:id', (req, res, next) => {
  knex('contacts').where('id', req.params.id).del().then(() => {
    res.send('successfully deleted a contact');
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
