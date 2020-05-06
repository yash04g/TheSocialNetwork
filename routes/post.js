const express = require("express");
const { getPosts, createPost, postsByUser, postById, isPoster, updatePost, deletePost} = require("../controller/post")
const { requireSignin } = require("../controller/auth")
const router = express.Router();
const { userById } = require("../controller/user")
const { createPostValidator } = require("../validators")

router.get("/posts", getPosts);
router.post("/posts/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.put("/posts/:postId", requireSignin, isPoster, updatePost);
router.delete("/posts/:postId",requireSignin, isPoster, deletePost);

router.param("userId", userById)
router.param("postId", postById)


module.exports = router;