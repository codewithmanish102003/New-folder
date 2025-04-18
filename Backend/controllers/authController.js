const userModel = require('../models/user_model');
const ownerModel = require('../models/owners_model');
const productModel = require('../models/product_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

//Registering as user
module.exports.registerUser = async (req, res) => {
    console.log("register")
    try {
        let { email, firstname, lastname, password, contact, gender } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email Is Already Registered' });
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).json({ error: err.message });
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) return res.status(500).json({ error: err.message });
                    let user = await userModel.create({
                        email,
                        password: hash,
                        firstname,
                        lastname,
                        contact,
                        gender
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.status(201).json({ message: 'User registered successfully', token });
                });
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Register as Owner
module.exports.registerAdmin = async (req, res) => {
    console.log("Admin Register Route")
    try {
        let { email, firstname, lastname, password, gstno, contact } = req.body;

        let owner = await ownerModel.findOne({ email });
        if (owner) {
            return res.status(400).json({ error: 'Email Already Registered'});
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ error: err.message });
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({ error: err.message });
                let owner = await ownerModel.create({
                    email,
                    password: hash,
                    firstname,
                    lastname,
                    gstno,
                    contact
                });

                let token = generateToken(owner);
                res.cookie("token", token);
                res.status(201).json({ message: 'Owner registered successfully', token });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Login Controller
module.exports.loginUser = async (req, res) => {
    console.log("route login")
    try{
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
        let owner = await ownerModel.findOne({ email });
        if (owner) {
            bcrypt.compare(password, owner.password, async (err, result) => {
                if (result) {
                    let role = owner.role;
                    let token = generateToken(owner);
                    res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 60 * 1000 });
                    const products = await productModel.find({ owner: owner._id });
                    return res.status(200).json({ message: 'Login successful', owner, token, products, role });
                } else {
                    return res.status(401).json({ error: 'Email or password is incorrect.' });
                }
            });
        } else {
            return res.status(404).json({ error: 'Email or password is incorrect'});
        }
    } else {
        let role = user.role
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true })
                return res.status(200).json({ message: 'Login successful', user, role, token });
            } else {
                return res.status(401).json({ error: 'Email or password is incorrect' });
            }
        });
    }
}catch (error) {
    res.status(500).json({ error: error.message });
}
};

//logout Controller
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully'});
};

//Deleting A user
module.exports.deleteUser = async (req, res) => {
    console.log('delete User called ')
    try{ let { email } = req.body;
    let user = await userModel.findOneAndDelete({ email });
    if (user) {
        return res.status(200).json({message: 'User deleted successfully', flash: req.flash});
    } else {
        return res.status(404).json({ error: 'User not found' });
    }}catch (error) {
        res.status(500).json({ error: error.message });
    }
   
};

//Deactivate a User
module.exports.deactivateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        // Update the user's account status
        user.is_active = false;
        await user.save();

        // Handle active sessions
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
        });

        // Notify the user
        const notification = {
            subject: 'Account Deactivated',
            message: 'Your account has been deactivated.',
        };
        // Send the notification via email or in-app notification

        res.json({ message: 'Account deactivated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//update a user account details
module.exports.updateUser = async (req, res) => {
    console.log("Route Hitted",req.body)
    try {
        const userId = req.body.id;
        const user = await userModel.findById(userId);
        console.log(user)
        if (!user) {
            const user= await ownerModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Something went wrong ! try again later' });
            }else{
                const { firstname, lastname, email, contact } = req.body;
                user.firstname = firstname;
                user.lastname = lastname;
                user.email = email;
                user.contact = contact;
                await user.save();
                res.json({ message: 'User account updated successfully'});
            }
        }else{
            console.log(req.body)
            const { firstname, lastname, email, contact } = req.body;
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.contact = contact;
            await user.save();
            res.json({ message: 'User account updated successfully'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error , Try Again!' });
    }
};