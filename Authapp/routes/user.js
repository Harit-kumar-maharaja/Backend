const express = require("express")
const router = express.Router();

const {login , signup } = require("../controllers/auth")
const {AUth , isstudent , isadmin} = require("../middlewares/AUTH");

router.post("/login" , login)
router.post("/signup" , signup)

//protected route
router.get("/test" , AUth , (req , res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for TESTS',
    })
})
router.get("/student" , AUth , isstudent , (req , res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for students',
    })
})
router.get("/admin" , AUth , isadmin , (req , res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for Admin',
    })
})

module.exports = router;