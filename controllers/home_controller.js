module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for Codeial! </h1> <h3> This is home page </h3>')

    return res.render('home',{
        title: 'Home'
    });
}

module.exports.playground = function(req,res){
    return res.end('<h1>This page is for playground </h1> <button> Play with me </button>');
}