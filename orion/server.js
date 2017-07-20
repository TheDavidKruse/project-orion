var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var logger = require('morgan');
var knex = require('./db/knex');
var cookiesParser = require('cookie-parser')

var app = express();


function basicAuth(req, res, next) {
  if (req.cookies.id) {
    next()
  } else {
    res.redirect('/login')
  }
}

var index = require('./routes/indexRoutes');
var login = require('./routes/login');
var todos = require('./routes/todosRoutes');
var contacts = require('./routes/contactsRoutes');
var jobs = require('./routes/jobsRoutes');
var student = require('./routes/studentRoutes');
var staff = require('./routes/staffRoutes');
var goal = require('./routes/goalRoutes');
var search = require('./routes/searchRoutes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookiesParser());

app.use('/', index);
app.use('/login', login);
app.use(basicAuth);
app.use('/todos', todos);
app.use('/contacts', contacts);
app.use('/jobs', jobs);
app.use('/student', student);
app.use('/staff', staff);
app.use('/goal', goal);
app.use('/search', search);

app.listen(port, function() {
  console.log("listening on port: ", port);
})
