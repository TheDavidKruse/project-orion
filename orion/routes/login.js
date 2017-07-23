var express = require('express');
var router = express.Router();
var knex = require('../db/knex');



/* GET login page page. */
router.get('/', function(req, res, next) {
  knex('staff').select().then(staff => knex('student').select().then(student => {
    res.render('login', {
      staff
    })
  }))
});

/* Post Login page. */
router.post('/', function(req, res, next) {
  knex('staff').select().where('email', req.body.email).then(staff => {
    if (staff.length > 0) {
      res.cookie('id', staff[0].id)
      res.cookie('is_staff', true)
      res.redirect(`/staff/${staff[0].id}`)
    } else {
      knex('student').select().where('email', req.body.email).then(student => {
        res.cookie('id', student[0].id)
        res.cookie('is_staff', false)
        res.redirect(`/student/${student[0].id}`)
      })
    }
  })
})

/* Post Sign Out page. */
router.post('/signout', function(req, res, next) {
  res.clearCookie('login');
  res.clearCookie('id');
  res.clearCookie('is_staff');
  res.redirect('/login');
});





module.exports = router;
