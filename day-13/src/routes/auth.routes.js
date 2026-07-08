const express=require("express")
const userModel=require("../models/user.models")
const jwt= require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register", async(req,res)=>{
    const{email,name,password}=req.body

    const isUserAlreadyExists= await userModel.findOne({email})
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists with this email"
        })
    }

    const crypto = crypto.CreateHash("md5").update(password).digest("hex")

    const user= await userModel.create({
        email,password,name
    })

    const token=jwt.sign(
        {
        id:user._id,
        email:user.email
        },
        process.env.JWT_SECRET
)

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
authRouter.post("/protected", async(req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message: "This is a protected route"
    })
})

authRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    const user= await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }
    const isPasswordValid= user.password===crypto.CreateHash("md5").update(password).digest("hex")
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(200).json({
        message: "User logged in",
        user,
    })
})
})


module.exports=authRouter