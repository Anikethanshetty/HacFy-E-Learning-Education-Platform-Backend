const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Adjust path if necessary
const {zodLoginverify} = require("../middlewares/userDetailszod");
const {userjwtverify} = require("../middlewares/userJWt")
const router = express.Router();


router.post('/register', zodLoginverify, require("../controllers/register"));
router.get("/verifyEmail",require("../controllers/verifyEmail")); 
router.post('/signin', require("../controllers/signin") );
router.get("/forgotPassword",require("../controllers/forgotPassword"))
router.post("/resetPasswordOtp",require("../controllers/resetPasswordOtp"))


// Export the router
module.exports = router;