module.exports.profile =function(req,res){
    // res.end("<h1>This page is for user's profile</h1>");

    res.render('users-profile',{
        title: "User's profile",
        x: 10
    })
}