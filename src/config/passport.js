const passport = require('passport');
require('./strategies/local.strategy.js')();

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}