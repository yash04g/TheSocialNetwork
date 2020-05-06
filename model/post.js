const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User" // This is how we build the relationship
    },
    created: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Post",postSchema);