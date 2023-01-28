const {Router}=require("express");
const QuizModel = require("../Model/Quiz.model");

const quizController=Router();

quizController.get("/", async(req,res)=>{
    const query=req.query;
    const {limit}=req.query;
    const questions=await QuizModel.find(query).limit(limit);
    res.send(questions)
})



module.exports={
    quizController
}