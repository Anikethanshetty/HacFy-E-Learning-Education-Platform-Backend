   
const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");


dotEnv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password. Please try again." });
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(401).json({ error: "Invalid email or password. Please try again." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            JWT_SECRET,
        );
  
        return res.status(200).json({ 
            login:true, 
            token,
            foundName: user.fullName ,
            foundEmail:user.email,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ 
            error: "An internal server error occurred. Please try again later." 
        });
    }
};

module.exports = signIn;
