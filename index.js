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

app.post("/calculate", (req,res)=>{
    const {P,I,T}=req.body;
    var aIA=Number(P);
    var aIR=Number(I);
    var tNY=Number(T);

    var totalMaturityValue= Math.floor(aIA*(((((1+aIR)**tNY)-1)/aIR))) ;
    var totalInvestmentAmount=aIA*tNY;
    var totalInterestGained=Math.floor(totalMaturityValue-totalInvestmentAmount);

    res.send({totalInvestmentAmount:totalInvestmentAmount,totalMaturityValue:totalMaturityValue,totalInterestGained:totalInterestGained})
})

connectDb(process.env.MONGO_URL)
// connectDb("mongodb+srv://Masai:1234@cluster0.o7niczp.mongodb.net/mock11?retryWrites=true&w=majority")
app.listen(3001, () => {

    console.log("Listening at port 3001")
})