var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all cohorts
*/
router.get('/', function(req, res) {
  knex('cohorts').then(function(cohorts) {
    res.render('cohorts-layout', {
      cohorts
    });
  });
});
// get one cohort
router.get('/:id', function(req, res){
  knex('cohorts').where('id', req.params.id).then(function(cohorts) {
    res.render('cohorts-layout', {
    cohorts
    });
  });
});
// get edit one cohort
router.get('/:id/edit', function(req, res, next) {
  knex('cohorts').select().where('id', req.params.id).then(function(cohorts) {
      console.log(cohorts);
    res.render('cohorts-layout', {
      cohorts
    });
  });
});

// post edit one cohort
router.post('/:id', function(req, res, next){
  knex('cohorts').update(req.body).where('id', req.params.id)
  .then(function(){
    knex('cohorts').then(function(cohorts){
        res.render('cohorts-layout', {
          cohorts
        });
      });
});
});
module.exports = router;
