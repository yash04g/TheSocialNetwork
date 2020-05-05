const User = require("../model/user")

exports.userById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "User not found"
            })
        }
        req.profile = user // Adds profile object in req with user info
        next()
    })
}