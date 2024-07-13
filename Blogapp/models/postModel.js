//import mongoose
const mongoose = require("mongoose");

//route handler
const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }],
    body:{
        type:String,
        required:true,
    },
})

//export
module.exports = mongoose.model("Post" , postSchema)