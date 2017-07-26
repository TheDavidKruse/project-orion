var express = require('express');
var router = express.Router();
var knex = require('../db/knex');



/*
  ADD a jobs
*/
router.post('/', (req, res, next) => {
  knex('jobs').insert(req.body).then(() => {
    res.send('successfully inserted new row in jobs');
  });
});


/*
  DELETE one job
*/
router.get('/delete/:id', (req, res, next) => {
  knex('jobs').where('id', req.params.id).del().then(() => {
    res.send('successfully deleted a job');
  });
});

/*
  EDIT one job
*/
router.post('/:id', (req, res, next) => {
  knex('jobs').where('id', req.params.id).update(req.body).then(() => {
    res.send('successfully updated a job');
  });
});

module.exports = router;
