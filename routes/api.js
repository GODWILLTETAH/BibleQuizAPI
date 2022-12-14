const express = require ('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const apiController = require ('../controllers/apiController');
const auth = require("../middleware/auth");
const checkUser = require('../middleware/checkUser');


router.get('/', apiController.home);
router.get('/categories', apiController.getCategories);
router.get('/quizzes/:val', apiController.getQuizzes);
router.get('/quizzes', apiController.getQuizzes);
router.get('/quizzes/:cat/:val', apiController.getQuizzesbyCategory);
router.get('/newQuiz', auth, apiController.quizForm)
router.post ('/newQuiz', apiController.postQuiz);
router.post ('/newCategory', apiController.postCategory);
router.post ('/logout', auth, indexController.logout);
//router.get ('*', indexController.NotFound);

// //single post
// router.get('/post/:id', indexController.post_details)

// router.get ('/about', indexController.about_Page);

// router.get ('/contact', indexController.contact_Page);

// router.get ('/blog', indexController.query_Posts);

// router.post ('/newsletter', indexController.email_Subs);


module.exports = router;