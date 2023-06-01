const passport = require('passport');
const { Strategy } = require('passport-local');
const conn = require("../databaseconnection");
const bcrypt = require("bcrypt");



module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {

    conn.query(
      `SELECT * FROM user WHERE email='${email}'`,
      (err, result) => {
        if (err)
          res.send(err);

        if (result.length == 0) {
          done(null, null);
        } else {
          bcrypt.compare(password, result[0].password,
            (erro, result) => {
              if (result) {
                const user = { email, password };
                done(null, user);
              } else {
                done(Error("incorrect password"), null);
              }
            });
        }
      });

  }));
};