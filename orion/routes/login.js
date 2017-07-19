var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function basicAuth(req, res, next) {
  knex('staff').select().then(staff => {
    if (req.cookies.email) {
      var finder = () => staff.filter(match => req.cookies.email);
      res.redirect(`/staff/${finder()[0].id}`)
    } else {
      next();
    }
  })
}

/* GET login page page. */
router.get('/', basicAuth, function(req, res, next) {
  res.render('login')
});

/* Post Login page. */
router.post('/', function(req, res, next) {
  knex('staff').select().then(staff => {
    var finder = match => match.email == req.body.email;
    var id = staff.find(finder).id
    console.log(id)

    finder() ? res.cookie('id', id) :
      res.cookie('login', true);
    res.cookie('email', req.body.email);
    res.redirect('/student');
  })
});

/* Post Sign Out page. */
router.post('/signout', function(req, res, next) {
  res.clearCookie('login');
  res.redirect('/login');
});





module.exports = router;
