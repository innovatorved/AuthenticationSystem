const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    }
});
const user = mongoose.model("user", UserSchema);
module.exports = user;