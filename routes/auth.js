const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Adjust path if necessary
const {zodLoginverify} = require("../middlewares/userDetailsZod");
const {userjwtverify} = require("../middlewares/jwtVerify")
const rateLimit = require('express-rate-limit');
const router = express.Router();

const otplimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    standardHeaders: 'draft-8', 
    legacyHeaders: false, 
    message: 'Too many OTP requests from this IP, please try again after 15 minutes.',
});

const passwordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    standardHeaders: 'draft-8', 
    legacyHeaders: false, 
    message: 'Too man requests from this IP, please try again after 15 minutes.',
});

router.post('/register', zodLoginverify, require("../controllers/signup"));
router.get("/verifyEmail",otplimiter,require("../controllers/verifyEmail")); 
router.post('/signin',passwordLimiter, require("../controllers/signin") );
router.get("/forgotPassword",require("../controllers/forgotPassword"))
router.post("/resetPasswordOtp",require("../controllers/resetPasswordOtp"))


  
// Export the router
module.exports = router;