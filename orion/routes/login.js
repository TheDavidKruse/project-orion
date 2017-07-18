var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function basicAuth(req, res, next) {
  req.cookies.login ? res.redirect('/student') :
    next();
}
/* GET login page page. */
router.get('/', basicAuth, function(req, res, next) {
  res.render('login')
});

/* Post Login page. */
router.post('/', function(req, res, next) {
  res.cookie('login', true);
  res.redirect('/student');
});

/* Post Sign Out page. */
router.post('/signout', function(req, res, next) {
  res.clearCookie('login');
  res.redirect('/login');
});





module.exports = router;
