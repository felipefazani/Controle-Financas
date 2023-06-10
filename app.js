const express = require('express');
const session = require('express-session');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require("bcrypt");
const saltRound = 10;
const cookieParser = require('cookie-parser');
const conn = require("./src/config/databaseconnection");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

//routing
const indexRouter = require('./src/routers/index.js');
const authRouter = require('./src/routers/authRouter.js');
const homeRouter = require('./src/routers/homeRouter.js');
const creditAPI = require('./src/api/credit_card.js');

//setting up 
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'top10financas'}));
app.use(cors());

//passport
require('./src/config/passport.js')(app)
  
app.post("/query", (req, res) => {
  conn.query(req.body.query, (err, result) => { 
    if (err)
      res.send(err);
    res.send(result) })
});

app.set('views', './src/views');

app.use('/home', homeRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/creditCard', creditAPI);

app.get('/', (req, res) => {
  res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
