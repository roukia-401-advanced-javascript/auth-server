'use strict';

//require schema
const users = require('../models/users/users-schema');
// what is this middleware used for?
// check on the token, does it exist?
// if yes then parse it and get user and validate him

// check if I have in my request header, an Authorization key
// header key Authorization 
// value of it {Bearer token}
module.exports = (req, res, next)=> {
  if (!req.headers.authorization) { //which check if i add a token in the header or not 
    return next('Invalid Login, No Headers !!'); 
  }
  console.log('req.headers.authoriation : ',req.headers.authorization); //bearer tokencode
  let bearer = req.headers.authorization.split(' '); //array the first part bearer and the sec is the tokencode
   
  if (bearer[0] == 'Bearer') { //to be sure that its a bearer not basic or something else
    const token = bearer[1];
    // authenticate this token and get the valid user
    console.log('iam token ',token);
    users.authenticateToken(token).then(validUser=> {
      console.log('validUser ---> ',validUser);
      req.user = validUser;
      next();
    }).catch(err=> next('Invalid Token!'));

  } else {
    return next('Invalid Bearer!!');
  }
};
