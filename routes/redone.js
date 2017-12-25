var express = require('express');
var router = express.Router();
var RED = require("node-red");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('route:r')
  //console.log(RED.stop)
  RED.nodes.stopFlows()
  res.send('stop');
});

module.exports = router;
