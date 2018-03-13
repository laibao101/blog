const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const {User} = reuqire("../models");
const {md5WithSalt} = require("../util");

module.exports.init = function () {
    passport.serializeUser((user, done) => {
        console.log('passport serializeUser=>', user);
        done(null, user.uid)
    });

    passport.deserializeUser((user, done) => {
        console.log('passport deserializeUser=>', user);
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'uname',
        passwordField: 'password'
    }, async (name, password, done) => {
        console.log('passport LocalStrategy=>', name, password);
        try {
            const result = await User.getUser(name);
            if (result.length < 1) {
                return done(null, false);
            }
            const user = result[0];
            if (user.password === md5WithSalt(password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(null, false);
            throw err;
        }
    }));

};
