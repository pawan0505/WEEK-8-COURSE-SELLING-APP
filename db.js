const {Schema, default: mongoose} = require("mongoose");
console.log("connected to")
mongoose.connect("mongodb+srv://pawank050520k:Pawank050520k%40@cluster0.rs0up.mongodb.net/coursera-app");
// const {Schema} = require("mongoose"); single line of code and below 2 lines of code means the same
// const mongoose = require("mongoose");
// const Schema = mongoose.schema
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}