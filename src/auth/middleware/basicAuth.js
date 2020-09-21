'use strict';
//require base64 for encoded and decoded
const base64 = require('base-64');
//require schema
const users = require('../models/users/users-schema');

module.exports = (req, res, next) => { // alwayes next because its a middleware
  // pass the username and password to this method;
  // Basic Authentication (HTTP Headers)
  // we expect to have req headers 
  // Basic YWhtYWRfc2hlbGEgOjEyMzQ=

  if (!req.headers.authorization) {
    next('missing Headers!'); // we add here return to exit it cuz next dont do that 
    return;
  }
  const auth = req.headers.authorization.split(' ');
  if (auth[0] == 'Basic') {
    //take the auth[1]: YWhtYWRfc2hlbGEgOjEyMzQ=
    // after decode ahmad_shela:1234
    // 1st decode auth[1] -> then split it on :
    const [username, password] = base64.decode(auth[1]).split(':'); //passing user and pass after decoded 
    users.authenticateBasic(username, password).then(validUser => {
      if (!validUser) { // to handel return null
        return next('Wrong Useranem or Password'); // return to exit 
      }
      // we have the user obj
      // generate a token for this user and return
      let token = users.generateToken(validUser.username);
      if (token) {
        req.basicAuth = {
          token: token,
          user: validUser,
        };
      }
      next(); //to signin handller

    }).catch(err => next(err));
  } else {
    next('Invalid Login!! ');
  }
};


