const jwt = require('jsonwebtoken');
const config = process.env;
const User = require('../model/user');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, config.TOKEN_KEY, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let profile;
          let user = await User.findById(decodedToken.user_id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  module.exports = checkUser;