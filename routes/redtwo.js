var express = require('express');
var router = express.Router();
var RED = require("node-red");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('route:r2')
  //console.log(RED.start)
  RED.nodes.startFlows()
  res.send('start');
});

module.exports = router;
