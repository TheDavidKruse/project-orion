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
var user = require('./routes/userRoutes');


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
app.use('/user', user)


app.listen(port, function() {
  console.log("listening on port: ", port);
})
