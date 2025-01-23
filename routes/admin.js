const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

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