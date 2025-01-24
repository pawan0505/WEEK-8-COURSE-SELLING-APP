const jwt = require("jsonwebtoken");
const { userModel, adminModel } = require("../db");

//helper to extract token from authorization header
function extractToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Missing or invalid Authorization header");
    }
    return authHeader.split(" ")[1]; //extract the token
}

async function userAuth(req, res, next){
    try{
        const token = extractToken(req);//parse token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
        const user = await userModel.findById(decoded.user);//find user by id

        if(!user){
            return res.status(401).json({message: "Unauthorized: user not found"});
        }

        req.user = user; //attach user to request
        next(); 
    }catch(err) {
        console.error(err);
        res.status(401).json({message: "Unauthorised: invalid user token"});
    }
}

async function adminAuth(req, res, next){

    try{
        const token = extractToken(req); //parse token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
        const admin = await adminModel.findById(decoded.admin); //find admin by id

        if(!admin) {
            return res.status(401).json({message: "Unauthorised: Admin not found"});
        }

        req.admin = admin; //attach admin to request
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({message: "Unauthorised: invalid admin token"});
    }
}

module.exports = {
    userAuth,
    adminAuth,
}