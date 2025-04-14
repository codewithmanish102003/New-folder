const express = require('express');
const router=express.Router()
const {registerAdmin}=require("../controllers/authController")

router.post('/register',registerAdmin)

module.exports=router