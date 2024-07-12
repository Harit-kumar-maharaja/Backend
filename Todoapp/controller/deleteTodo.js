//import the model
const Todo = require("../models/Todo")

//define route handler

exports.deleteTodo = async(req , res) => {
    try{
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);

        res.json({
            success:true,
            message:"Todo DELETED",
        })
        
    }catch(error){
        console.error(error);
        console.log(error);
        res.status(500)
        .json({
            success:fail,
            data:'Internal server error',
            message:err.message,
        })
    }
}