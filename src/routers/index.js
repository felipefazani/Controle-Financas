var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');


console.log(__dirname);
app.set("pages", path.join(__dirname, '../views/index.html'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(app.get('pages'));
    // res.sendFile(path.join(__dirname, '../views/index.html'));
  });
  
module.exports = router;
  