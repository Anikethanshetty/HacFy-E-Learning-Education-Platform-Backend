const User = require("../models/User");

const verifyEmail = async (req, res) => {
  const { otp, email } = req.body;
    
  try {
    
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        valid: false,
      });
    }
    
    if (user.verificationToken === otp) {
      try {
        await User.updateOne(
          { email }, // filter conditon
          { $set: { verificationToken: null }}, 
          {$set:{verified:true}}
        );

        return res.status(201).json({
          message: "OTP is verified",
          valid: true,
        });
      } catch (updateError) {
        console.error("Error updating token:", updateError);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid OTP",
        valid: false,
      });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = verifyEmail;
