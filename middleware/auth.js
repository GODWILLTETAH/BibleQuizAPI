const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
  req.cookies.jwt || req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, config.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }

  // if (!token) {
  //   return res.status(403).send("A token is required for authentication");
  // }
  // try {
  //   const decoded = jwt.verify(token, config.TOKEN_KEY);
  //   req.user = decoded;
  // } catch (err) {
  //   return res.status(401).send("Invalid Token");
  // }
  // return next();
};

module.exports = verifyToken;