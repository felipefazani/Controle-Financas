const express = require('express');
const homeRouter = express.Router();
const app = express();
const path = require('path');

app.set("home", path.join(__dirname, '../views/home.html'));
app.set("lancamentos", path.join(__dirname, '../views/lancamentos.html'));

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
    res.sendFile(app.get('home'));
    // res.sendFile(path.join(__dirname, '../views/index.html'));
  });

homeRouter.get('/lancamentos', function(req, res, next) {
  res.sendFile(app.get('lancamentos'));
});
  
module.exports = homeRouter;
  