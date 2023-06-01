const express = require('express');
const indexRouter = express.Router();
const app = express();
const path = require('path');


console.log(__dirname);
app.set("pages", path.join(__dirname, '../views/index.html'));

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
    res.sendFile(app.get('pages'));
    // res.sendFile(path.join(__dirname, '../views/index.html'));
  });
  
module.exports = indexRouter;
  