const User = require('../models/User');
const bcrypt = require('bcrypt');
const { z } = require("zod");

// Validation schema for the request body
const requireBody = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must not exceed 20 characters"),
});

const resetPasswordOtp = async (req, res) => {
    const { email, newPassword, otp } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required", valid: false });
    }

    const safeparse = requireBody.safeParse({ newPassword });
    if (!safeparse.success) {
        console.log("Invalid password format:", safeparse.error.errors);
        return res.status(400).json({ message: safeparse.error.errors[0].message });
    }

    try {
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "User not found", valid: false });
        }

        if (findUser.verificationToken !== otp) {
            return res.status(400).json({ message: "Invalid OTP!" });
        }

        // Hash the new password
        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        
        await User.updateOne(
            { email },
            { password: hashedPassword, verificationToken: null }
        );

        return res.status(200).json({ message: "Password reset successful", valid: true });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Server error", valid: false });
    }
};

module.exports = resetPasswordOtp;
