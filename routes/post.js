const express = require("express");
const app = express();
const { getPosts } = require("../controller/post")
const router = express.Router();

router.get("/",getPosts);

module.exports = router;