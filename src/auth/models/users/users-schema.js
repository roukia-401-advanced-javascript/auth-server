'use strict';

// require mongoose
// export schema


const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = 'mytokensecret';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, required: true, enum: ['Regular ', 'Writers', 'Administrators']}
});

let roles = {
  Regular: ['read'],
  Writers: ['read', 'create'],
  Administrators: ['read', 'create', 'update', 'delete'],

};

// hooks //.pre
// right before the save , do this function which is to hash the pass
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5); //this.password reffer to the password from from the save function not the one in DB
});

//  userSchema.methods.create = async function (user) {
//   // await this.schema.find({ username: user.username });
//   let newUser = new userSchema(user);
//   return await newUser.save();
// }


//add methods to schema 
// userSchema.methods > will add methods on the schema  
userSchema.methods.comparePasswords = async function (password) {
  const valid = await bcrypt.compare(password, this.password); //this.password reffer to password from schema
  return valid ? this : null;
};

// add static methods
//userSchema.statics > add static methods on the schema
userSchema.statics.generateToken = function (user) {
  console.log("i am the user ",user);
  console.log("i am the user.username ",user.username);
  console.log("i am the roles[user.role] ",roles[user.role]);
  return jwt.sign({ username: user.username ,actions: roles[user.role]}, SECRET);
};

userSchema.statics.authenticateBasic = async function (username, password) {
  let result = await this.findOne({ username: username });
  if (result) {
    let compareResult = await result.comparePasswords(password);
    return compareResult;
  } else {
    return null;
  }
};

// for bearer auth

userSchema.statics.authenticateToken = async function (token) {
  //do it try and catch in jwt.verify
  try {
    let tokenObject = jwt.verify(token, SECRET); //jwt.verify will return an object after decoded the token
    console.log("tokenObject -----> ", tokenObject); //check if this exist in my db by username or id
    let results = await this.findOne({ username: tokenObject.username }); 
    console.log("results", results); 
    if (results) {
      return Promise.resolve({
        tokenObject: tokenObject,
        user: tokenObject.username
      })
    } else {
      return Promise.reject();
    }

  } catch (e) {
    return Promise.reject();
  }
}



module.exports = mongoose.model('users', userSchema);
