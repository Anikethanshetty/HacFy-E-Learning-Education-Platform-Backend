
const User = require('../models/User');
const bcrypt = require('bcrypt');
        
const resetPasswordOtp = async (req, res) => {
    const { email,newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Invalid credentials", valid: false });
    }

    try {
        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(404).json({ message: "User not found", valid: false });
        }
  
        const saltRounds = 5;
        
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.updateOne(
            { password: hashedPassword },
            { where: { email: email } }
        );
        
        return res.status(200).json({ message: "Password reset successful", valid: true });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Server error", valid: false });
    }
};

module.exports = resetPasswordOtp;
