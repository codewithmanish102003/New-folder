const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: 3,
        trim: true,
        required: true,
    },
    lastname: {
        type: String,
        minLength: 3,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: "owner"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    image: {
        type: Buffer,
    },
    contact: {
        type: Number,
        minLength: 10,
        trim: true
    },
    gstno:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("owner", ownerSchema);