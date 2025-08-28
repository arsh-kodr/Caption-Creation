const userModel = require("../models/user.model");
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, password } = req.body;

  const isAlreadyUser = await userModel.findOne({
    username,
  });

  if (isAlreadyUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  let hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hash,
  });

  let token = jwt.sign(
    {
      id: user._id,
    },
    jwt_secret
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user,
    token,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({id : user._id} , jwt_secret);

  res.cookie("token" , token);

  res.status(200).json({
    message : "User logged in Successfully!!",
    user ,
    token
  })
}

module.exports = { registerController, loginController };
