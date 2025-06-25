const jwt = require('jsonwebtoken');
const ownerModel = require("../models/owners_model");
const userModel = require("../models/user_model");

module.exports = async function (req, res, next) {
    let token = req.cookies.token;
    // Check Authorization header if cookie is not present
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: "You need to login first" });
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            let owner = await ownerModel.findOne({ email: decoded.email }).select("-password");
            if (!owner) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = owner;
            return next();
        } else {
            req.user = user;
            return next();
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
};