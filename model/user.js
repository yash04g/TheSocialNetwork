const mongoose = require("mongoose");
const { v1: uuidv1 } = require('uuid');

const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username:{
        type: String,
        trim: true,
        required: true
    },  
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

// Virtual Field
userSchema.virtual('password')
    .set(function (password) {
        // Create temporary variable called password
        this._password = password
        // Generate a time stamp
        this.salt = uuidv1();
        //Encrypt the password
        this.hashed_password = this.encryptPassoword(password)
    })
    .get(function () {
        return this._password;
    })

// Methods

userSchema.methods = {
    authenticate : function(plainText){
        return this.encryptPassoword(plainText) === this.hashed_password;
    },
    encryptPassoword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }
        catch (err) {
            return ""
        }

    }
}

module.exports = mongoose.model("User", userSchema);