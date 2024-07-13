//import models
const Post = require("../models/postModel")
const Like = require("../models/likeModel")


//like a post

exports.likePost= async (req , res) =>{
    try {

        const {post , user} = req.body;
        const like = new Like({
            post,user
        });
        const savedLike = await like.save();

        //update the post collection basis of this 
        const updatedpost = await Post.findByIdAndUpdate(post , {$push : {likes:savedLike._id}} , {new : true}).populate("likes").exec()

        res.json({
            post:updatedpost,
        })
        
    } catch (error) {
        return res.status(500).json({
            error:"Error while liking post", 
        })
    }
}


//unlike a post
exports.unlikePost = async (req , res) => {
    try {

        const {post , like} = req.body;

        //find and delete like collection me se 
        const deletedLike = await Like.findOneAndDelete({post : post , _id:like});

        //updtae the post collection
        const updatePost = await Post.findByIdAndUpdate(post, {$pull : {likes:deletedLike._id}} , {new:true});

        res.json({
            post:updatePost,
        });
        
    } catch (error) {
        return res.status(500).json({
            error:"Error while unliking post", 
        })
    }
}