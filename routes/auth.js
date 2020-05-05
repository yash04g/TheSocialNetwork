const express = require("express");
const { signup,signin,signout } = require("../controller/auth")
const { userSignUpValidator } = require("../validators/index")
const { userById } = require("../controller/user")

const router = express.Router();

router.post("/signup",userSignUpValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

// Any route containing userId, our app will first execute userById
router.param("userId",userById) // We want to execute a method which gets information based on userId, 
                                // it will make query in the database and get the user information 
                                // and append it to request object

module.exports = router;