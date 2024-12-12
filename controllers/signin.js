const bcrypt = require("bcryptjs");
const User = require("../models/User");


const signIn = async (req,res) => {
    const { email,password } = req.body;
    if (!email ||  !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
      
      const existingUser = await User.findOne({ email });
      const name = existingUser.fullName;
      const email = existingUser.email;
        if (!existingUser) {
          return res.status(400).json({ message: 'User with this email not exists' });
        }

        const isPasswordMatching = await bcrypt.compare(password,existingUser.password)
        
        if(!isPasswordMatching) {
            return res.status(401).json({message:"incorrect password"});
        }

        return res.status(200).json({message:"login successfull",name,email});

    }catch(err) {
        console.log(err)
        return res.status(500).json({message:"server errorr"});
    }

}

module.exports=signIn;
