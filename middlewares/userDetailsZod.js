const {z}= require("zod")
const requireBody = z.object({
   fullName:z.string().max(30),
    email:z.string().email(),
    phone:z.string(),
    password:z.string().min(8).max(18),
})

const zodLoginverify = (req,res,next)=>{
    const safeParse = requireBody.safeParse(req.body)

    if(!safeParse.success){
        res.status(411).json({
            messege :"Incorrect format of email or password or name or phone number",
            error:safeParse.error.issues[0].message
        })
        return
    }
    req.body =safeParse.data
    next()
}
module.exports={    

    zodLoginverify
}