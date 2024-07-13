const express = require("express");
const app = express();

require("dotenv").config()
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

const blog = require("./routes/blog")

//mount
app.use("/api/v1" , blog);

const connectwithDb = require("./config/database");
connectwithDb();

//start the server
app.listen(PORT , () => {
    console.log(`App started at port no ${PORT}`);
})