var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('DASH')
  console.log("user",req.user)
  console.log("query",req.query)
  var page=req.query.p? req.query.p : 0
  console.log("page",page)
  res.render(`dash/index`, { 
  	title: 'Dash',
  	user: req.user,
  	page
  });
});

module.exports = router;
