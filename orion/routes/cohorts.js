var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// post edit one cohort
router.post('/:id', function(req, res, next) {
  knex('cohorts').update(req.body).where('id', req.params.id)
    .then(function() {
      knex('cohorts').then(function(cohorts) {
        res.render('cohorts-layout', {
          cohorts
        });
      });
    });
});
module.exports = router;
