const File = require("../models/File");

//localfileupload handler

exports.localFileUpload = async (req , res) => {
    try {

        const file = req.files.file;

        let path = __dirname + "/files/" + Date.now()  + `.${file.name.split('.')[1]}`;

        file.mv(path , (err) => {
            console.log(err);
        })

        res.json({
            success:true,
            message:'Local file uploaded succesfully',
        })
        
    } catch (error) {
        console.log(error);
    }
}