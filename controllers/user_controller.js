const User = require('../models/user');

// render the user profile page
module.exports.profile = function (req, res) {
    // res.end("<h1>This page is for user's profile</h1>");

    res.render('user_profile', {
        title: "User's profile",
        x: 10
    })
}

// render the user sign up page
module.exports.signUp = function (req, res) {
    return res.render('sign_up', {
        title: 'Sign up'
    });
}

// render the user sign in page
module.exports.signIn = function (req, res) {
    return res.render('sign_in', {
        title: 'Sign In'
    });
}

module.exports.createUser = function (req, res) {
    
    // check if password and confirm password are same or not
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    // check if user already exists in our db
    User.findOne({ email_id: req.body.email_id }, function (err, user) {
        if (err) {
            console.log(`Error! ${err} Cannot sign up the user`);
            return;
        }
        if (!user) {
            User.create(req.body, function (err, newTask) {
                if (err) {
                    console.log(`Error: ${err}! \nCannot create a new user`);
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        }
        // else means user exists in our db, so dont create
        else{
            return res.redirect('back');
        }
    })

}