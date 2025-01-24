const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminAuth } = require("./auth");
const e = require("express");

adminRouter.post("/signup", async function(req, res){

    const {email, password, firstName, lastName} = req.body;
    //try catch block
try{
    //check if user exists
    const existingUser = await adminModel.findOne({email});
    if(existingUser) {
        return res.status(401).json({message: "Email already exists"})
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    //create admin user
    await adminModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })
    //return signup successed
    res.status(201).json({message: "signup succeeded!"});
} catch (err) {
    //catch error
    console.error(err);
    res.status(500).json({message: "Error creating admin user"});
}
});

adminRouter.post("/signin", async function(req, res) {
    const {email, password} = req.body;
    //try catch block
try{
    //check if user exists
    const admin = await adminModel.findOne({email});
    if(!admin) {
        return res.status(401).json({message: "Invalid credentials"});
    }
    //verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) {
        return res.status(401).json({message: "Invalid credentials"})
    }
    //generate jwt on successful login
    const token = jwt.sign({adminId: admin._id}, process.env.JWT_SECRET, {expiresIn: "30m"});

    //respond with token
    res.json({token});
}catch (err) {
    console.error(err);
    res.status(500).json({message: "Error signing in admin"})
}  
});

// adminRouter.use(adminMiddleware);

adminRouter.post("/courses", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/courses", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}