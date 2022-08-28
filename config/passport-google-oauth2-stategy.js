const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "868309701555-nrtu8drd3s75a9vd3gaud1o2iorhus4a.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email_id: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log(`Error in google strategy pasport!\n Error code- {$err}`);
                return;
            }
            console.log(accessToken,refreshToken);
            console.log(profile);
            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create this user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email_id: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log(`Error in creating user\n Error code- {$err}`);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;