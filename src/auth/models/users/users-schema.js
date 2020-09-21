'use strict';

// require mongoose
// export schema


const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = 'mytokensecret';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password:{type: String, required: true},
});

// hooks //.pre
// right before the save , do this function which is to hash the pass
userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 5); //this.password reffer to the password from from the save function not the one in DB
});


//add methods to schema 
// userSchema.methods > will add methods on the schema  
userSchema.methods.comparePasswords = async function(password) {
  const valid = await bcrypt.compare(password, this.password); //this.password reffer to password from schema
  return valid ? this : null;
};

// add static methods
//userSchema.statics > add static methods on the schema
userSchema.statics.generateToken = function(username) {
  return jwt.sign({username: username},SECRET);
};

userSchema.statics.authenticateBasic = async function(username,password) {
  let result = await this.findOne({username: username});
  if(result) {
    let compareResult = await result.comparePasswords(password);
    return compareResult;
  } else {
    return null;
  }
};


module.exports = mongoose.model('users', userSchema);
