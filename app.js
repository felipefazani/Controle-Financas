const express = require('express');
const session = require('express-session');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require("bcrypt");
const saltRound = 10;
const cookieParser = require('cookie-parser');
const conn = require("./src/config/databaseconnection");

const PORT = process.env.PORT || 3000;
const app = express();

//routing
const indexRouter = require('./src/routers/index.js');
const authRouter = require('./src/routers/authRouter.js');
const homeRouter = require('./src/routers/homeRouter.js');

//setting up 
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'top10financas'}));

//passport
require('./src/config/passport.js')(app)
  
app.post("/query", (req, res) => {
  conn.query(req.body.query, (err, result) => { res.send(result) })
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email; 
  const pswd = req.body.password;

  bcrypt.hash(pswd, saltRound, (err, hash) => {
    conn.query(
      `SELECT * FROM user WHERE email = '${email}'`,
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length == 0) {
          conn.query(
            `INSERT INTO user values (NULL, '${name}', '${email}', '${hash}')`,
            (err, result) => {
              if (err){
                res.send(err);
              }
              res.send({ msg: "Registered completed"});
            });
        } else {
          res.send({ msg: "This user is already registered"});
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  const pswd = req.body.password;
  const email = req.body.email;

  conn.query(
    `SELECT * FROM user WHERE email='${req.body.email}'`,
    (err, result) => {
      if (err)
        res.send(err);
      
      if (result.length == 0){
        res.send({msg: "email incorrect"});
      }else{
        bcrypt.compare(pswd, result[0].password, 
          (erro, result) =>{
            if (result) {
              res.send({msg: "user logged"});
            } else {
              res.send({msg: "password incorrect"});
            }
          }
        );
        
      }
    }
  );
});


app.set('views', './src/views');

app.use('/home', homeRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
