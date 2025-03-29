const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    image: {
        type: Buffer,
        required: true,
    },
    bgcolor: {
        type: String,
    },
    panelcolor: {
        type: String,  
    },
    textcolor: {
        type: String,  
    },
    quantity: {
        type: Number,
        required: true,
        default:1,
    },
    description:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "owner",
        required: true,
    },
});

module.exports = mongoose.model("product", productSchema);