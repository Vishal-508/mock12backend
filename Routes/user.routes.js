const { Router } = require("express");
const UserModel = require("../Model/User.model");
const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken");
const { authentication } = require("../middleware/authentication");

const userController=Router();

userController.get("/getProfile/:userId",authentication, async(req, res)=>{
    const UserId=req.body.userId;
    var user = await UserModel.findOne({ _id:UserId });
    res.send(user);
})



userController.post("/register", async (req, res) => {
    const {name, email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (user) {
        res.status(409).send({ message: "User already exists" });
    } else {
        if (email && password) {
            try {
                console.log(email, password)
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = new UserModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                });
                console.log(newUser)

                await newUser.save();


                res.status(201).send({ message: "Signup success" });
            } catch (err) {
                res
                    .status(400)
                    .send({ message: "Some error occured while signing up" });
            }
        } else {
            res.status(405).send({ message: "All fields are required" });
        }
    }
    })


userController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {

        var user = await UserModel.findOne({ email });
        const hash = user.password;

        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                res.send({ message: "Something went wrong, please try again later" })
            }
            if (result) {
                var token = jwt.sign({ email: email,userId:user._id  }, process.env.SECRET_KEY);
                res.send({ message: "Login Successful", token })
            } else {
                res.send({ message: "Invalid Credentials1" })
            }
        });
    } catch (err) {
        res.send({ message: "Invalid Credentials" })
    }
})


module.exports={
    userController
}