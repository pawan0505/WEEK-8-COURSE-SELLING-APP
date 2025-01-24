const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userAuth } = require("./auth");

userRouter.post("/signup", async function(req, res) {
    const {email, password, firstName, lastName } = req.body; // Todo: adding zod validation
    
    //Todo: implement zod or other validation library here

try {
    const existingUser = await userModel.findOne({email});
    if (existingUser){
        return res.status(400).json({message: "Email already exists"})
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    await userModel.create({
        email: email,
        password: hashedpassword,
        firstName: firstName,
        lastName: lastName
    });

    res.status(201).json({message: "signup succeeded!"});
} catch (err) {
    console.error(err);
    res.status(500).json({message: "Error creating user"});
}
});

userRouter.post("/signin", async function(req, res){
try{
    const {email, password} = req.body;

    //check if user exists
    const user = await userModel.findOne({email});
    if(!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    //verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    //Generate JWT on successful login
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn:"1d"});
    
    //respond with token
    res.json({token});
} catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({message: "Error signing in user"});
}
});

userRouter.get("/purchases", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    userRouter: userRouter
}