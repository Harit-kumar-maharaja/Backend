const mongoose = require("mongoose");

require("dotenv").config();

const connectwithDb = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("DB Connected sucessfully"))
    .catch((error) => {
        console.log("DB Facing connection issues");
        process.exit(1);
    })
};

module.exports = connectwithDb;