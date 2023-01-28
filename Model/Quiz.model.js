const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  category: { type: String, require: true, trim: true },
  type: { type: String, require: true, trim: true },
  difficulty: { type: String, require: true, trim: true },
  question: { type: String, require: true, trim: true },
  correct_answer: { type: String, require: true, trim: true },
  incorrect_answers: { type: Array, require: true, trim: true },
});

const QuizModel = mongoose.model("quize", quizSchema);

module.exports = QuizModel;