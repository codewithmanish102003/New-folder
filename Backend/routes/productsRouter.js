const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners_model');
const upload = require('../config/multer_config');
const productModel = require('../models/product_model');
const isLoggedInUser = require('../middlewares/isLoggedInUser');

//1.fetching all products
router.get('/', async (req, res) => { 
    try {
        let products = await productModel.find({});
        products = products.map(product => {
            return {
                ...product._doc,
                image: product.image ? product.image.toString('base64') : null
            };
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

//2.create a product
router.post('/create', isLoggedInUser, upload.single('image'), async (req, res) => {
    console.log("create product");
    
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor, description } = req.body;
        const ownerId = req.user._id;
        const image = req.file ? req.file.buffer : null;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            description,
            owner: ownerId,
            image,
        });

        await ownerModel.findByIdAndUpdate(ownerId, {
            $push: { products: product._id }
        });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: error.message });
    }
});

//3.deleting a created product
router.delete('/delete/:id', isLoggedInUser, async (req, res) => {
    console.log("delete product");
    try {
        const productId = req.params.id;
        const product = await product

        Model.findByIdAndDelete(productId);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: error.message });
    }
}
);

//4.updating a created product
router.put('/update/:id', isLoggedInUser, async (req, res) => {
    console.log("update product");
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const product = await productModel.findByIdAndUpdate
        (productId, updatedProduct, { new: true });
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
});


//5.owner products
router.get('/owner-products', isLoggedInUser, async (req, res) => {
    try {
        const ownerId = req.user._id; // Assuming req.user contains the logged-in user's details
        const products = await productModel.find({ owner: ownerId });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch owner's products" });
    }
});

module.exports = router;