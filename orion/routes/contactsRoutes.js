var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all contacts if no query strings passed
  Otherwise GET one contact for a student ID and contact ID
*/
router.get('/', (req, res, next) => {
  console.log('in contacts / route, req.query=', req.query);
  if(typeof req.query.student_id !== 'undefined' && typeof req.query.contact_id !== 'undefined') {
    console.log('getting contacts details');
    // Get contact details for a contact using contact ID and student ID
    let student_id = req.query.student_id;
    let contact_id = req.query.contact_id;
    let sqlArr = [knex('staff').select().where('id', req.cookies.id),
      knex.raw(`select student_todo.*, student.first_name as student_first, student.last_name as student_last, student.staff_id, staff.first_name as staff_first, staff.last_name as staff_last, todo.id, todo.name as assignment_name, todo.description, todo.status from student_todo join student on student.id = student_todo.student_id join staff on staff.id = student.staff_id join todo on todo.id = student_todo.todo_id where staff.id = ${req.cookies.id}`),
      knex('student').select(),
      // knex('contacts').select().where('student_id', req.params.id),
      knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${student_id}`),
      knex('jobs').select().where('student_id', student_id),
      knex.raw(`select s.photo_url, s.email, concat (s.first_name, ' ', s.last_name) as student_name, t.*, st.* from student s, todo t, student_todo st where s.id = st.student_id and t.id = st.todo_id and s.id = ${student_id}`)
    ];
    Promise.all(sqlArr).then(function(result) {
      console.log('this is from student routes', result[5].rows)
      res.render('student-layout', {
        staff: result[0],
        staffHome: result[1].rows,
        students: result[2],
        contacts: result[3].rows,
        jobs: result[4],
        students: result[5].rows,
        selectedContact: false,
        selectedJob: false
      })
    })
    // let sqlArr = [
    //   knex.raw(`select c.company_name, c.position, c.student_id, c.id, concat (c.first_name, ' ', c.last_name) as contact_name, concat (s.first_name, ' ', s.last_name) as student_name from contacts c, student s where c.student_id = s.id and s.id = ${student_id}`),
    //   knex('contacts').where('id', contact_id)
    // ];
    // Promise.all(sqlArr).then((results) => {
    //   res.render('student-layout', {
    //     contacts: results[0].rows,
    //     selectedContact: results[1][0],
    //     jobs: false,
    //     selectedJob: false,
    //     students: results[0].rows
    //   });
    // });
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
      selectedJob: false,
      students: false
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
