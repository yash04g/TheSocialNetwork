const express = require("express");
const { getPosts, createPost } = require("../controller/post")
const router = express.Router();
const { createPostValidator } = require("../validators")

router.get("/",getPosts);
router.post("/post",createPostValidator, createPost);

module.exports = router;