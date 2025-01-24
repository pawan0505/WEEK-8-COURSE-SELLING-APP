const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config(); // Load environment variables

//imported routes handler and auth middlewares
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { auth } = require("./routes/auth");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
});
// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000, () => console.log(`Server listening on port ${3000}`));