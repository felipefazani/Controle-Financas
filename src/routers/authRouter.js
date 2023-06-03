const express = require('express');
const bcrypt = require("bcrypt");
const conn = require("../config/databaseconnection");
const passport = require('passport');

const authRouter = express.Router();
const saltRound = 10;

authRouter.route('/signUp').post((req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const pswd = req.body.password;

  if (pswd != req.body.confirmPassword) {
    res.send({msg : "Password and Confirm Password doesn't coincide "});
    // Error("Incorrect password and confirm password");
  } else {  
    bcrypt.hash(pswd, saltRound, (err, hash) => {
      conn.query(
        `SELECT * FROM user WHERE email = '${email}'`,
        (err, result) => {
          if (err) {
            res.send("Error in signup: \n" + err);
          }
  
          if (result.length == 0) {
            conn.query(
              `INSERT INTO user values (NULL, '${name}', '${email}', '${hash}')`,
              (err, result) => {
                if (err) {
                  res.send(err);
                }
                user = {
                  username: req.body.username,
                  email: req.body.email,
                }
                req.login(user, () => {
                  console.log({ msg: "Registered completed" });
                  res.redirect('/home');
                });
              });
  
          } else {
            res.send({ msg: "This user is already registered" });
          }
        }
      );
    });
  }

});

authRouter
  .route('/signIn')
  .post(passport.authenticate('local', {
    successRedirect: '/home',
    failureMessage: '/'
  }));

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;