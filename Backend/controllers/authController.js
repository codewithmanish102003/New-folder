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
            req.flash('error_msg', 'Email Is Already Registered');
            return res.status(400).json({ error: 'Email Is Already Registered', flash: req.flash() });
        }

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
                req.flash('success_msg', 'User registered successfully');
                res.status(201).json({ message: 'User registered successfully', token, flash: req.flash() });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Register as Owner
module.exports.registerAdmin = async (req, res) => {
    try {
        let { email, firstname, lastname, password, gstno, contact } = req.body;

        let owner = await ownerModel.findOne({ email });
        if (owner) {
            req.flash('error_msg', 'Owner already exists');
            return res.status(400).json({ error: 'Owner already exists', flash: req.flash() });
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
                req.flash('success_msg', 'Owner registered successfully');
                res.status(201).json({ message: 'Owner registered successfully', token, flash: req.flash() });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Login Controller
module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    console.log("route login")
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
                    req.flash('success_msg', 'Login successful');
                    return res.status(200).json({ message: 'Login successful', owner, token, products, role, flash: req.flash() });
                } else {
                    req.flash('error_msg', 'Email or password is incorrect.');
                    return res.status(401).json({ error: 'Email or password is incorrect.', flash: req.flash() });
                }
            });
        } else {
            req.flash('error_msg', 'Email or password is incorrect');
            return res.status(404).json({ error: 'Email or password is incorrect', flash: req.flash() });
        }
    } else {
        let role = user.role
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true });
                req.flash('success_msg', 'Login successful');
                return res.status(200).json({ message: 'Login successful', user, role, token, flash: req.flash() });
            } else {
                req.flash('error_msg', 'Invalid credentials');
                return res.status(401).json({ error: 'Invalid credentials', flash: req.flash() });
            }
        });
    }
};

//logout Controller
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    req.flash('success_msg', 'Logged out successfully');
    res.status(200).json({ message: 'Logged out successfully', flash: req.flash() });
};

//Deleting A user
module.exports.deleteUser = async (req, res) => {
    console.log('delete User called ')
    let { email } = req.body;
    console.log("delete")
    let user = await userModel.findOneAndDelete({ email });
    if (user) {
        req.flash('success_msg', 'User deleted successfully');
        return res.status(200).json({
            message: 'User deleted successfully', flash: req.flash
        });
    } else {
        req.flash('error_msg', 'User not found');
        return res.status(404).json({ error: 'User not found', flash: req.flash() });
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
    console.log("Route hitted")
    console.log(req.body)
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
     console.log(req.body)
      const { firstname, lastname, email, contact } = req.body;
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.contact = contact;
      await user.save();
      req.flash('success', "user details updated succeessfully")
      res.json({ message: 'User account updated successfully', flash: req.flash() });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };