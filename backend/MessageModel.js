


const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: { type: String, require: true },
    name: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Messages", messageSchema)