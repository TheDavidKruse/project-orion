var express = require('express');
var router = express.Router();
var knex = require('../db/knex');



/* GET login page page. */
router.get('/', function(req, res, next) {
  knex('staff').select().then(staff => knex('student').select().then(student => {
    console.log('this is from get', staff)
    res.render('login', {
      staff
    })
  }))
});

/* Post Login page. */
router.post('/', function(req, res, next) {
  knex('staff').select().where('email', req.body.email).then(staff =>
    knex('student').select().where('email', req.body.email).then(student => {
      if (staff[0].is_staff) {
        res.cookie('id', staff[0].id)
        res.redirect(`/staff/${staff[0].id}`)
      } else {
        res.cookie('id', staff[0].id)
        res.redirect(`/student/${student[0].id}`)
      }
    }))
})

/* Post Sign Out page. */
router.post('/signout', function(req, res, next) {
  res.clearCookie('login');
  res.redirect('/login');
});





module.exports = router;
