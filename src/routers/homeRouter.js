const express = require('express');
const homeRouter = express.Router();
const app = express();
const path = require('path');

app.set("pages", path.join(__dirname, '../views/home.html'));

// Authorize only logged users
homeRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
})

/* GET home page. */
homeRouter.get('/', function(req, res, next) {
    res.sendFile(app.get('pages'));
    // res.sendFile(path.join(__dirname, '../views/index.html'));
  });
  
module.exports = homeRouter;
  