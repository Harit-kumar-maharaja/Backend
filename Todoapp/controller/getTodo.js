//import the model
const Todo = require("../models/Todo")

//define router handler

exports.getTodo = async(req, res) => {
    try {
        //fetch all todos items from database
        const todos = await Todo.find({});

        //response
        res.status(200)
        .json({
            success:true,
            data:todos,
            message:"Entire todo data is fetched",
        })
    } catch (error) {
        console.error(error);
        res.status(500)
        .json({
            success:false,
            error:error.message,
            message:'Server error',
        })
    }
}

exports.getTodoById = async(req , res) => {
    try {
        //extract todo items by id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        //data for given id not found
        if(!todo){
            return res.status(404).json({
                success:true,
                message:"No data found for given id",
            })
        }

        //data for given id found
        res.status(200).json({
            success:true,
            data:todo,
            message:`todo ${id} dtat succesfully fetched`,
        })

    } catch (error) {
        console.error(error);
        res.status(500)
        .json({
            success:false,
            error:error.message,
            message:'Server error',
        })
    }
}