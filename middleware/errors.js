function errorHandler(err) {
  let errors = { email: '', password: '', first_name: '' };
    // if (typeof err === "string") {
    //   // custom application error
    //   return res.status(400).json({ message: err });
    // }

    // if (err.name === "ValidationError") {
    //   // mongoose validation error
    //   return res.status(400).json({ message: err.message });
    // }

    //added
  
    if (err.name === "UnauthorizedError") {
      // jwt authentication error
      return res.status(401).json({ message: "Token not valid" });

    }

    // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
     console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
       //console.log(val);
       //console.log(properties.message);
      errors[properties.path] = properties.message;
    });
  }
 //end
 //return res.status(500).json({ message: err.message });
  
    // default to 500 server error
    return errors;
  }
  
  module.exports = {
    errorHandler,
  };