const mongoose = require("mongoose");
require("dotenv").config();

const mongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    } catch (error) {
        console.log("mongodb not connected");
    }

}


module.exports = mongo