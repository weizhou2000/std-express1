var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var user = require('./util/user');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var config=require('config')

var app = express();

//passport
passport.use(new Strategy(
  function(username, password, cb) {
    console.log('STATEGY')
    console.log('u:',username,"p:",password)
    user.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }
));
passport.serializeUser(function(user, cb) {
  console.log('SERIALIZE USER')
  console.log(user)
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  console.log('DESERIALIZE USER')
  user.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


//hbs
var hbs = require('hbs');
hbs.localsAsTemplateData(app);
hbs.registerPartials(__dirname + '/views/partial');

hbs.registerHelper('inc', x=>x+1);
hbs.registerHelper('bodyClass', title => title==='登录'? 'hold-transition login-page' : 'hold-transition skin-blue sidebar-mini' );
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});
hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
});


//local
app.locals.siteName = config.get('site.name');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


//routes---------------------------------------------------
var auth=require('connect-ensure-login').ensureLoggedIn

app.get('/', (req,res)=>res.send('<a href="/dash">Start</a>'));
app.use('/dash',auth(), require('./routes/dash'));
app.use('/login', require('./routes/login'));
app.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/login');
});

//----------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
