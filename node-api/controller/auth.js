const User = require("../model/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
require("dotenv").config();

exports.signup = async (req,res)=>{
    const userExists = await User.findOne({username : req.body.username})
    if(userExists){
        return res.status(403).json({
            error : "Username is taken"
        })
    }
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message : "Signup successfull! Please login"})
}

exports.signin = (req,res) =>{
    // Find the user based on username
    const {username,password} = req.body
    // If error or no user
    User.findOne({username},(err,user)=>{
        if(err || !user){
            return res.status(401).json({
                error : "User with that username doesn't exist please sign in"
            })
        }
        // If user is found make sure the username and the password match
        // create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Username and password dont match "
            })
        }
        // generate a token with user id and secret
        const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire : new Date()+9999})
        // return response with user and token to frontend client
        const {_id, name, username, email} = user
        return res.json({token,user : {_id,name,username,email}});
    })
}

exports.signout = (req,res)=>{
    // We just need to clear the cookie 
    res.clearCookie("t");
    return res.status(200).json({
        message : "Signout success!"
    })
}

exports.requireSignin = expressJwt({
    // If token is valid, express JWT appends the verified users id in an auth key to the request
    secret : process.env.JWT_SECRET,
    userProperty : "auth" // With this we can access auth.id to check the currently signed in user's id
})

exports.hasAuthorization = (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(403).json({
            error : "User is not authorized! Please sign in!"
        })
    }
}