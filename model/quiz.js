const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    correct_answer:{
        type: String,
        required: true
    },
    incorrect_answers: [{
        type : String,
        required: true
    }],
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
      }
})


module.exports = mongoose.model("quiz", quizSchema);