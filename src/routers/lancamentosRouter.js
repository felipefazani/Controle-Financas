const express = require('express');
const lancamentosRouter = express.Router();
const app = express();
const path = require('path');

app.set("lancamentos", path.join(__dirname, '../views/lancamentos.html'));

// Authorize only logged users
lancamentosRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
})

lancamentosRouter.get('/', function(req, res, next) {
  res.sendFile(app.get('lancamentos'));
});
  
module.exports = lancamentosRouter;
  