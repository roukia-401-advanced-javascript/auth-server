"use strict";

const users = require('../models/users/users-schema');
const superagent = require('superagent');
require("dotenv").config();

const client_id = process.env.CLIENT_ID || "357d26c982678312445b";
const client_secret = process.env.CLIENT_SECRET || "be401497802ebe676a94f8319c040d5dd94af9f7";


module.exports = async (req, res, next) => {
    // 1 - get the code
    // 2- exchange code with token
    // 3- i have the token, exchange token with user
    // 4- save user to my db
    try {
        console.log("req.query ---> ", req.query); // code that i want to exchange it is sent in the url req query
        let code = req.query.code;
        console.log("code : ", code);

        let token = await exchangeCodeWithToken(code);
        console.log(" token ---> ", token)
        let user = await exchangeTokenWithUser(token);

        let [savedUser, serverToken] = await saveUser(user);

        req.user = savedUser;
        req.token = serverToken;
        next();
    } catch (e) {
        return Promise.reject();
    }
};

async function exchangeCodeWithToken(code) {
    try {
        const urlToGetToken = 'https://github.com/login/oauth/access_token'; //github docs
        const response = await superagent.post(urlToGetToken).send({
            client_id: "357d26c982678312445b",
            client_secret: "be401497802ebe676a94f8319c040d5dd94af9f7",
            code: code,
            redirect_uri: 'http://localhost:4000/oauth',
            grant_type: 'authorization_code',
        });
        console.log("exchangeCodeWithToken response ----> ", response.body);
        return response.body.access_token; //the token is in the res.body.access_token

    } catch (e) {
        return Promise.reject();
    }

}

async function exchangeTokenWithUser(token) {
    try {
        let userResponse = await superagent
            .get('https://api.github.com/user') //github docs
            .set('Authorization', `token ${token}`)
            // .set('User-Agent', 'user-agent/1.0')
            .set('user-agent', 'express-app')
        console.log("userResponse.body: ", userResponse.body)
        return userResponse.body;

    } catch (e) {
        return Promise.reject();
    }

}

async function saveUser(user) {
    console.log("user: ", user);
    try {
        let record = {
            username: user.login,
            password: 'XXXX',
            // role: 'Regular'
        }
        let newUser = new users(record)
        let saveduser = await newUser.save();
        let myserverToken = users.generateToken(saveduser);
        return [saveduser, myserverToken];

    } catch (e) {
        return Promise.reject();
    }

}


