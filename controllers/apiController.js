const Quiz = require('../model/quiz');
const Category = require ('../model/category')
const { errorHandler } = require('../middleware/errors');

module.exports.postQuiz = async (req, res) => {
  const {category, correct_answer, incorrect_answers, question} = req.body;
    try {
      const quiz = await Quiz.create({
        category,
        correct_answer,
        incorrect_answers,
        question
      });
      res.status(201).json ({quiz: quiz});
    } catch (err) {
      console.log(err);
    }
  } 

  module.exports.getQuizzes = (req, res) => {
    const val = req.params.val ; 
    Quiz.find()
    .sort({"_id": -1})
    .populate("category", '-_id -date -__v -description -questions')
    .select('-_id -date -__v')
    .limit(val)
    .then((quizzes)=>{
      res.json({
        response_status: '200',
        results: quizzes
      })
    })
  }

  module.exports.getQuizzes = (req, res) => {
    //const val = req.params.val ; 
    Quiz.find()
    .sort({"_id": -1})
    .populate("category", '-_id -date -__v -description -questions')
    .select('-_id -date -__v')
    .then((quizzes)=>{
      res.json({
        response_status: '200',
        results: quizzes
      })
    })
  }

  module.exports.quizForm = (req, res) => {
    Category.find()
    .then((category)=>{
      res.render ('quizForm',{category: category});
    })
  }

  module.exports.getQuizzesbyCategory = (req, res) => {
    let Cat;
    const id = Category.findOne({name: req.params.cat }).then((doc)=>{
      Cat = doc._id;
    });
    const val = req.params.val;
    Quiz.find({name: id})
    .sort({"_id": -1})
    .populate("category", '-_id -date -__v -description -questions')
    .select('-_id -date -__v')
    .limit(val)
    .then((quizzes)=>{
      res.json({
        response_status: '200',
        results: quizzes
      })
    })
  }

  module.exports.postCategory = async (req, res) => {
    const {name, description} = req.body;
    try {
      const category = await Category.create({
        name,
        description
      });
      res.status(201).json({
        status: 201,
        message: 'Category successfully added',
        category: category
      })
    } catch (err) {
      console.log(err);
    }
  }

  
  module.exports.home = (req, res) => {
    res.redirect('/index')
  }

  module.exports.getCategories = (req, res) => {
    Category.find().sort({"_id": -1})
    .then((categories)=>{
        res.json({
          status: 'ok',
          categories: categories,
        })
    })
  }