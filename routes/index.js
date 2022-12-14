const express = require ('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require("../middleware/auth");
const checkUser = require('../middleware/checkUser');

router.get('/', indexController.home);
router.get('/login', indexController.loginForm);
router.get('/register', indexController.registerForm);
router.get('/index', auth, checkUser, indexController.index)
router.post ('/register', indexController.register);
router.post ('/login', indexController.login);
router.post ('/logout', auth, indexController.logout);
//router.get ('*', indexController.NotFound);


// //single post
// router.get('/post/:id', indexController.post_details)

// router.get ('/about', indexController.about_Page);

// router.get ('/contact', indexController.contact_Page);

// router.get ('/blog', indexController.query_Posts);

// router.post ('/newsletter', indexController.email_Subs);


module.exports = router;