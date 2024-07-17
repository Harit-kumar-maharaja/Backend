const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

const db = require("./config/database")
db.connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect(); 

const Upload = require("./routes/fileUpload");
app.use('/api/v1/upload' , Upload);

app.listen(PORT , () => {
    console.log(`App is running at the port ${PORT}`);
})