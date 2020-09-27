'use strict';

'use strict';
const superagent = require('superagent');
const users = require('../models/users/users-schema.js');
require('dotenv').config();
const client_id = process.env.CLIENT_ID || '357d26c982678312445b';
const client_secret = process.env.CLIENT_SECRET || 'be401497802ebe676a94f8319c040d5dd94af9f7';
/*
TOKEN_SERVER=https://github.com/login/oauth/access_token
REMOTE_API=https://api.github.com/user
API_SERVER=http://localhost:3030/oauth
*/
module.exports = async (req, res, next) => {
  // 1 - get the code
  // 2- exchange code with token
  // 3- i have the token, exchange token with user
  // 4- save user to my db
  try {
    // console.log("req.query ---> ", req.query); // code that i want to exchange it is sent in the url req query
    let code = req.query.code;
    console.log('1111111111111111111111111111 code : ', code);
    let token = await exchangeCodeWithToken(code);
    console.log(' 22222222222222222222222222222 token ---> ', token);
    let user = await exchangeTokenWithUser(token);
    console.log('3333333333333333333333333 user', user);
    let [savedUser, serverToken] = await saveUser(user);
    req.user = savedUser;
    req.token = serverToken;
    console.log('req.user 444444444444444444', req.user);
    console.log('req.token 4444444444444444', req.token);
    next();
  } catch (e) {
    return Promise.reject();
  }
};
async function exchangeCodeWithToken(code) {
  // const urlToGetToken = 'https://github.com/login/oauth/access_token'; //github docs
  let response = await superagent.post('https://github.com/login/oauth/access_token').send({
    code: code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: 'http://localhost:4000/oauth',
    grant_type: 'authorization_code',
  });
    // console.log("exchangeCodeWithToken response ----> ", response.body);
  let access_token = response.body.access_token;
  console.log('access_token in OOOOOOOOOOOOOOOOOOuath', access_token);
  return access_token; //the token is in the res.body.access_token
}
async function exchangeTokenWithUser(token) {
  let userResponse = await superagent.get('https://api.github.com/user') //github docs
  // .set('User-Agent', 'user-agent/1.0')
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);
  let userInfo = userResponse.body;
  console.log('userinfo in OOOOOOOOOOOOOOOOOOuath', userInfo);
  return userInfo;
}
async function saveUser(user) {
  console.log('user inside OOOOOOOOOOOOOOOOOOuath: ', user);
  let record = {
    username: user.login,
    password: 'XXXX', 
  };
  let newUser = new users(record);
  console.log('newUser in OAUTH', newUser);
  let saveduser = await newUser.save();
  console.log('saveduser in OAUTH', saveduser);
  let myserverToken = users.generateToken(saveduser);
  console.log('myserverToken in OAUTH');
  return [saveduser, myserverToken];
}

