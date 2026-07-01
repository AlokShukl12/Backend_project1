const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function userRegister(req,res) {
    const {name, email, password, role="user"} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {name},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User already exits."
        })
    }

    const hash= await bcrypt.hash(password,10)

   const user = await userModel.create({
    name,
    email,
    password:hash,
    role
   });
   const token = jwt.sign({
    id: user._id,
    role : user.role
   },process.env.JWT_SECRET)
   res.cookie("token",token);

   res.status(201).json({
    message: "User created successfully",
    user:{
        id : user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role

    }
   })
}

async function userLogin(req,res) {
    const {name,email,password} = req.body;

    const isValidUser= await userModel.findOne({
        $or:[
            {name},
            {email}
        ]
    })
    if(!isValidUser){
        return res.status(401).json({
            message:"Invalid credentials."
        })
    }
    const validPassword = bcrypt.compare(password,isValidUser.password)
    if(!validPassword){ return res.status(401).json({
            message:"Invalid credentials."
        })
    }
    const token = jwt.sign({
        id:isValidUser._id,
        role: isValidUser.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"Login successfully.",
        isValidUser:{
            name: isValidUser.name,
            email: isValidUser.email,
            password: isValidUser.password,
            role: isValidUser.role
        }
    })


}

async function logOut(req,res) {
    res.clearCookie("token");
    res.status(201).json({
        message: "User Logout successfully",

    })
    
}
module.exports = {userRegister,userLogin,logOut}