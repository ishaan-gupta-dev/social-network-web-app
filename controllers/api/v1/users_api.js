const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
    try{
        let user = await User.findOne({
            email_id: req.body.email_id
        });

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid username or password"
            });
        }
        return res.json(200,{
            message: "Signed in successful, here is your token, please keep it safe",
            data:{
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: "100000"})
            }
        });

    }catch(err){
        console.log(`Error: ${err}! \nCannot sign in the user`);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}