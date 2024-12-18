const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")
dotEnv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function userjwtverify (req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_SECRET)
    if(decoded){
        console.log(decoded)

    req.userId = decoded.indexOf;
    next()
    }else{
        res.status(403).json({
            message :"You are not signed in"
        })
    }
}

module.exports={
    userjwtverify
}