const bcrypt = require("bcrypt");
const User = require("../models/Usermmodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req , res) => {
    try {

        //get data
        const {name , email , password , role}= req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                succes:false,
                message:'User already exists',
            })
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password , 10)
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'error in hashing password',  
            });
        }

        //create entry for user
        const user = await User.create({
            name , password , email , password:hashedPassword , role
        })

        return res.status(200).json({
            success: true,
            message:"User created succesfully",
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be created , please try again later',
        })
    }
}


// login
  
exports.login = async (req , res) => {
    try {

        //data fetch
        const {email , password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all details carefully',
            });
        }

        //chec for registered user
        const user = await User.findOne({email});
        //if no a registered user
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        //verify password and generate a jwt token
        if(await bcrypt.compare(password , user.password)){
            //password matched
            let token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn:"24h"});

            console.log(user);
            user.token = token;
            user.password = undefined; 
            console.log(user);
            
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token" , token ,options).status(200).json({
                success:true,
                token ,
                user,
                message:'User logded in succesfully',
            });
        }
        else{
            //password do not match
            return res.status(403).json({
                success:false,
                message:'Password incorrect',
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failed',
        })       
    }
}