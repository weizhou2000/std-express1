var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  console.log('LOGIN')
  var errorMsg=req.flash('error')[0]
  res.render('login', { title: '登录', errorMsg });
});


router.post('/', 
  passport.authenticate('local', { successRedirect: '/dash',
                                   failureRedirect: '/login',
                                   failureFlash:'用户名或密码不正确！'  }),
  function(req, res) {
  	res.redirect('/');
  }
);


module.exports = router;
