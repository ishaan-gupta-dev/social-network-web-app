module.exports.home = function(req,res){    

    /* // console logging the incoming cookie i.e it is a req
    console.log(req.cookies);
    // altering the cookie value from server and sending it back i.e it is a res
    res.cookie('user_id',25); */

    // return res.end('<h1> Express is up for Codeial! </h1> <h3> This is home page </h3>')
    return res.render('home',{
        title: 'Home'
    });
}