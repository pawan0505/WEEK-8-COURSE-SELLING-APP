const express = require("express");
const mongoose = require("mongoose");

// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config(); // Load environment variables

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
// const port = process.env.port || 3000; //.env
// Middleware
// app.use(bodyParser.json());
// app.use(cors());
// //Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));
// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    await mongoose.connect("mongodb+srv://pawank050520k:Pawank050520k%40@cluster0.rs0up.mongodb.net/coursera-app");
    app.listen(3000);
    console.log("listening on port 3000")
}

main(); 