const express = require("express");
const { route } = require("../app");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const jwt_secret = process.env.JWT_SECRET

router.post("/register" , async(req , res)  => {
    const {username , password} = req.body;

    const isAlreadyUser = await userModel.findOne({
        username
    })

    if(isAlreadyUser) {
        return res.status(409).json({
            message : "User already exists"
        })
    }

    let hash = await bcrypt.hash(password , 10);

    const user = await userModel.create({
        username,
        password : hash
    })

    let token = jwt.sign({
        id : user._id
    } , jwt_secret)

    res.cookie("token" , token)

    res.status(201).json({
        message : "User Created Successfully",
        user,
        token
    })
})



module.exports = router;