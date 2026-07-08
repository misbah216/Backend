const express = require('express');
const authRouter= express.Router();
const userModel = require("../models/user.model");
const cypto = require("crypto");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res)=>{
    const {name, email , password } = req.body;

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = new userModel({
        name,
        email,
        password: cypto.createHash("sha256").update(password).digest("hex")
    });
    await user.save();

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token",token)
    
    res.status(201).json({
        message: "User registered successfully",
        user :{
            name: user.name,
            email: user.email,
        }
    })

})

authRouter.get("/get-me", async (req, res)=>{
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    res.json({
        name: user.name,
        email: user.email,
    })

})

authRouter.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
     
    if(!user){
        return res.status(400).json({
            message: "User does not exist"
        });
    }

    const hashedPassword = cypto.createHash("sha256").update(password).digest("hex");
    const isPasswordValid = hashedPassword === user.password;

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    res.json({
        message: "User logged in successfully",
        user: {
            name: user.name,
            email: user.email,
        }
    })
})

module.exports= authRouter;