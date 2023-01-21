const express = require("express");
const connectDb = require("./Config/db");
// const UserModel = require("./Model/User.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { userController } = require("./Routes/user.routes");
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("mock12 backend")
})


app.use("/user", userController);


connectDb(process.env.MONGO_URL)
// connectDb("mongodb+srv://Masai:1234@cluster0.o7niczp.mongodb.net/mock11?retryWrites=true&w=majority")
app.listen(3001, () => {

    console.log("Listening at port 3001")
})