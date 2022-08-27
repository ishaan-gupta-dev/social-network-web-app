const passport = require('passport');
const User = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){

    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log(`Cannot find the user!\nError code- ${err}`);
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;