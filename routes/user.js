const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    const {email, password, firstName, lastName } = req.body; // Todo: adding zod validation
    //Todo: hash the password so plaintext pw is not stored in the DB 

    //Todo: Put inside a try catch block
    try {
        await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating user"
        });
    }
    res.json({
        message: "signup succeeded!"
    })
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

userRouter.get("/purchases", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    userRouter: userRouter
}