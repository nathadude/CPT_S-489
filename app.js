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
const Forum = require('./model/Forum');
const Post = require('./model/Post');
const Comments = require('./model/Comments');
const ForumMembers = require('./model/ForumMembers');
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

  const forum = await Forum.create({
    username: 'josh', // who the forum is created by
    forumName: 'WSU',
    forumDesc: 'This is a forum for anything about Washington State University',
    created_at: currentDate.toLocaleString()
  });

  const forum2 = await Forum.create({
    username: 'josh', // who the forum is created by
    forumName: 'CPTS489',
    forumDesc: 'This is a forum for anything about CPTS 489/Web Dev',
    created_at: currentDate.toLocaleString()
  });

  const forumMember1 = await ForumMembers.create({
    username: 'josh',
    forumID: '1'
  });

  const forumMember2 = await ForumMembers.create({
    username: 'josh',
    forumID: '2'
  });

  const post1 = await Post.create({
    'username': 'josh',
    'forumID': 1,
    'title': "What is the best major at WSU",
    'content': "I am wondering what the best program at WSU is. I am a first year student and I'm not sure what I want to pursue.",
    'created_at': currentDate.toLocaleString(),
    'votes': 5
  });

  const post2 = await Post.create({
    'username': 'josh',
    'forumID': 1,
    'title': "Dorm Life at WSU",
    'content': "I was wondering what the dorms were like here at wsu?",
    'created_at': currentDate.toLocaleString(),
    'votes': 30
  });

  const post3 = await Post.create({
    'username': 'josh',
    'forumID': 2,
    'title': "Model View Controller",
    'content': "Can someone help explain the concept of MVC in Web dev?",
    'created_at': currentDate.toLocaleString(),
    'votes': 0
  });


  console.log("josh instance created...");
}

sequelize.sync({ force: true }).then(()=>{
  console.log("Sequelize Sync Completed...");
  setup().then((()=> console.log("User setup complete")))
});

module.exports = app;
