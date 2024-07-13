const express = require("express");
const router = express.Router();

//import controller
const {likePost , unlikePost} = require("../controllers/likeController")
const {createComment} = require("../controllers/commentController")
const {createPost} = require("../controllers/postController")

//mapping controller

router.post("/comments/create" , createComment)
router.post("/posts/create" , createPost)
router.post("/likes/like" , likePost);
router.post("/likes/unlike" , unlikePost);

//export
module.exports = router;