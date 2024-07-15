const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected successfully");
    } catch (err) {
        console.error("DB Connection issue:", err);
        process.exit(1);
    }
};
