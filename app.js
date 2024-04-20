var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const sequelize = require('./db')

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
const User = require('./model/User');
const Topic = require('./model/Topic');
const Post = require('./model/Post');
const Comments = require('./model/Comments');
const TopicMembers = require('./model/TopicMembers');
const { DATE, DATEONLY } = require('sequelize');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', indexRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function setup() {
  var currentDate = new Date();
  const josh = await User.create({
    username: 'josh', 
    password: '1234',
    registration_date: currentDate.toLocaleString(),
    premium: false,
    admin: false
  });
  console.log("josh instance created...");
}

sequelize.sync({ force: true }).then(()=>{
  console.log("Sequelize Sync Completed...");
  setup().then((()=> console.log("User setup complete")))
});

module.exports = app;
