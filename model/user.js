const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required : true,
    //unique : [true, 'name already exist']
    //default: null
  },
  last_name: {
    type: String,
    //default: null
    required : true,
  },
  email: { 
    type: String, 
    unique: [true, 'email aleady exist'],
    required : true,
  },
  password: { 
    type: String,
    required : true,
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  date: {
    type: Date,
    default: Date.now
  },
  //token: { type: String },
});
//userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function(next) {
  //const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};


module.exports = mongoose.model("user", userSchema);