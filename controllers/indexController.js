const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const { errorHandler } = require('../middleware/errors');


const maxAge = 3 * 24 * 60 * 60;

module.exports.home = (req, res) => {
  res.render('home');
}

module.exports.loginForm = (req, res) => {
  res.render('login');
}

module.exports.registerForm = (req, res) => {
  res.render('register');
}

module.exports.register = async (req, res, next) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;
    // Validate user input
    // if (!(email && password && first_name && last_name)) {
    //   res.status(400).send("All input is required");
    // }

    // check if user already exist
    // Validate if user exist in our database
    // const oldUser = await User.findOne({ email });

    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    //Encrypt user password
    //encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: maxAge,
      }
    );
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // save user token
    user.token = token;

    // return new user
    //res.status(201).json({user: user});
    res.status(201).json({message: "Account created successfully"});

  } catch (err) {
    //console.log(err);
    const errors = errorHandler(err);
    res.status(400).json({ errors });

  }
  // Our register logic ends here
}

module.exports.login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    // if (!(email && password)) {
    //   res.status(400).send("All input is required");
    // }
    // Validate if user exist in our database
    const user = await User.login(email, password);

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: maxAge,
        }
      );
      // save user token
      user.token = token;
      // user
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({user});

    //res.status(400).send("Invalid Credentials");
    //return res.status(500).json({ message: err.message });
  
  } catch (err) {
    //console.log(err.message);
    const errors = errorHandler(err);
    res.status(400).json({ errors });
    //return next(err);
  }
}

// res.cookie('jwt', '', {maxAge: 1});
// res.redirect('/login').send({
//   message: 'Logged out successfully'
// })

module.exports.logout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
}



module.exports.index = (req, res) => {
  res.render('index', {first_name: res.locals.user.first_name, email: res.locals.user.email})
  //res.status(200).send("Welcome 🙌 ");
  //return res.status(401).json({ message: "Authorized User!!" });
}


module.exports.NotFound = (req, res) => {
  res.redirect('/')
  //res.status(200).send("Welcome 🙌 ");
  //return res.status(401).json({ message: "Authorized User!!" });
}