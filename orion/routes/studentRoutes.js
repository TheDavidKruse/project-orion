var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all contacts
*/
router.get('/', function(req, res) {
  knex('student').then(function(student) {
    // res.send(student);
    res.render('student-layout');
  });
});

router.get('/:id', function(req, res){
  knex('student').where('id', req.params.id).then(function(student) {
    res.send(student);
  });
});

router.get('/:id/edit', function(req, res, next) {
  knex('student').select().where('id', req.params.id).then(function(student) {
      console.log(student);
    res.send(student);
  });
});


router.post('/:id', function(req, res, next){
  knex('student').update(req.body).where('id', req.params.id)
  .then(function(){
    knex('student').then(function(student){
        res.send(student);
      });
});
});
module.exports = router;
