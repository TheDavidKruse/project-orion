var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all contacts if no query strings passed
  Otherwise GET one contact for a student ID and contact ID
*/
router.get('/', (req, res, next) => {
  if(typeof req.query.student_id !== 'undefined' && typeof req.query.contact_id !== 'undefined') {
    // Get contact details for a contact using contact ID and student ID
    let student_id = req.query.student_id;
    let contact_id = req.query.contact_id;
    let sqlArr = [
      knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${student_id}`),
      knex('contacts').where('id', contact_id)
    ];
    Promise.all(sqlArr).then((results) => {
      res.render('student-layout', {
        contacts: results[0].rows,
        selectedContact: results[1][0],
        jobs: false,
        selectedJob: false
      });
    });
  } else {
    // Get all contacts
    knex('contacts').then(contacts => res.send(contacts));
  }
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
  console.log('url=', req.originalUrl);
  knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${req.params.id}`).then(
    contacts => res.render('student-layout', {
      contacts: contacts.rows,
      selectedContact: false,
      jobs: false,
      selectedJob: false
    })
  );
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
  knex('contacts').where('id', req.params.id).then(contacts => {
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
