const User = require('../models/user');
const Post = require('../models/post');
// render the user profile page
module.exports.profile = function (req, res) {
    // res.end("<h1>This page is for user's profile</h1>");

    // res.render('user_profile', {
    //     title: "User's profile",
    // })

    /* Post.find({}, function(err,posts){
        return res.render('user_profile',{
            title: "User's Profile",
            posts: posts,
        })
    }) */

    // populate the user of each post
    Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            User.find({}, function (err, users) {
                return res.render('user_profile', {
                    title: "User's Profile",
                    posts: posts,
                    all_users: users
                });
            });
        });
}

module.exports.profile2 = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile2', {
            title: 'User profile',
            profile_user: user
        });
    });
}

module.exports.update = function (req, res) {
    if (req.user.id = req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, /* OR {name: req.body.name, email_id; req.body.email_id} */ function (err, user) {
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}
// render the user sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('sign_up', {
        title: 'Codeial | Sign up'
    });
}

// render the user sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('sign_in', {
        title: 'Codeial | Sign In'
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
        else {
            return res.redirect('back');
        }
    })

}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/user/profile');
}

// sign out and destroy the session for the user

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(`Error! ${err} Cannot sign out the user`);
        }
    });
    return res.redirect('/');
}