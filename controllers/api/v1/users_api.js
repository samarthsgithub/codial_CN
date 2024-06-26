const User = require('../../../models/User');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res) {
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
               message:"Invalid username or password"
            });
        }
        return res.json(200,{
            message:"sign in successful, here is your token ",
            data:{
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
            }
        })
    }catch(err){
       console.log('*******',err);
       return res.json(500,{
        message:"Internal Server Error"
       })
    }
};