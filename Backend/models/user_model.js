const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
    },
    contact: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid phone number'],
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female","other"],
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user", userSchema);