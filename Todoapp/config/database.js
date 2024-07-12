const mongoose = require("mongoose")

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Db connection succesfull"))
    .catch((error) => {
        console.log("Issue with db connection");
        process.exit(1)
    })
}

module.exports = dbConnect; 