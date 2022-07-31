const User = require('../models/user');

module.exports.profile =function(req,res){
    // res.end("<h1>This page is for user's profile</h1>");

    res.render('user_profile',{
        title: "User's profile",
        x: 10
    })
}
module.exports.signUp = function (req, res) {
    return res.render('sign_up', {
        title: 'Sign up'
    });
}

module.exports.createUser = function (req, res) {
    User.create({
        email_id: req.body.email_id,
        password: req.body.password,
        name: req.body.name
    }, function (err, newTask) {
        if (err) {
            console.log(`Error: ${err}! \nCannot create a new user`);
            return;
        }
        return res.redirect('back');
    });
}