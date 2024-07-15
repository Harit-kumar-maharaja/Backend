//auth , istudent , isadmin

const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.AUth = (req , res , next) => {
    try {
        //extract jwt token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer" , "");

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            next();
        }catch(error){
            return res.status(401).json({
                success: false,
                message: 'Token Invalid',
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }   
}

exports.isstudent = (req,res,next) => {
    try {
        if(req.user.role!== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for students',
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

exports.isadmin = (req,res,next) => {
    try {
        if(req.user.role!== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for admin',
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}