var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  GET all contacts
*/
router.get('/', function(req, res, next) {
  res.send('Showing all contacts');
});

module.exports = router;
