const express = require('express');
const PerfilRouter = express.Router();
const app = express();
const path = require('path');

app.set("perfil", path.join(__dirname, '../views/perfil.html'));

// Authorize only logged users
PerfilRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
})

PerfilRouter.get('/', function(req, res, next) {
  res.sendFile(app.get('perfil'));
});
  
module.exports = PerfilRouter;
  