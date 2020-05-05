const express = require("express");
const { getPosts, createPost } = require("../controller/post")
const { requireSignin } = require("../controller/auth")
const router = express.Router();
const { userById } = require("../controller/user")
const { createPostValidator } = require("../validators")

router.get("/", getPosts);
router.post("/post",requireSignin, createPostValidator, createPost);
router.param("userId", userById)


module.exports = router;