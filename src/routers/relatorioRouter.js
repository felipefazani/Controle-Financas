const express = require('express');
const RelatoriosRouter = express.Router();
const app = express();
const path = require('path');

app.set("relatorios", path.join(__dirname, '../views/relatorios.html'));

// Authorize only logged users
RelatoriosRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
})

RelatoriosRouter.get('/', function(req, res, next) {
  res.sendFile(app.get('relatorios'));
});
  
module.exports = RelatoriosRouter;
  