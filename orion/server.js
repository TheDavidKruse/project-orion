var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var logger = require('morgan');
var knex = require('./db/knex');
var cookiesParser = require('cookie-parser')

var index = require('./routes/indexRoutes');
var todos = require('./routes/todosRoutes');
var login = require('./routes/login');
var contacts = require('./routes/contactsRoutes');
var jobs = require('./routes/jobsRoutes');
var student = require('./routes/studentRoutes');
var staff = require('./routes/staffRoutes');
var goal = require('./routes/goalRoutes');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookiesParser());

app.use('/todos', todos);
app.use('/login', login);
app.use('/contacts', contacts);
app.use('/jobs', jobs);
app.use('/', index);
app.use('/student', student)
app.use('/staff', staff)
app.use('/goal', goal)

app.listen(port, function() {
  console.log("listening on port: ", port);
})
