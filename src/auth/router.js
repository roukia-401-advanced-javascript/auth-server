'use strict';

// require express
const express = require('express');

//require schema
const users = require('./models/users/users-schema');

//middleware basicauth

const basicAuth = require('./middleware/basicAuth');

//middleware openAuth

const OAuthMiddleware = require('./middleware/oauth');

// express Router
const router = express.Router();

//-----------------------------------------------------routes---------------------------------
router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler); //basicAuth is a middleware (seperate file)
router.get('/allusers', basicAuth, getAllUsers);
router.get('/oauth', OAuthMiddleware, oAuthSignunHandler);


// router.delete('/deleteuser', (req, res) => {
//     users.deleteOne({}).then((results) => {
//         res.status(200).json(results)
//     })
// })

//---------------------------------------------------functions------------------------------------

function signUpHandler(req, res) {
    // first check if the username exists then add it if not 
    users.findOne({ username: req.body.username }).then(results => {
        if (results) {
            res.status(409).send('user exists! use another username');
        } else {
            let user = new users(req.body);
            // hash the password first by adding hook in the schema 
            user.save().then((user) => { // method to save to db it return the saved user 
                let token = users.generateToken(user); //users is the schema i will pass the username of the saved user
                res.status(201).send(token);
            });
        }
    });

}



function signInHandler(req, res) {
    if (req.basicAuth) {
        // add the token as cookie 
        res.cookie('token', req.basicAuth.token);
        // add a header
        res.set('token', req.basicAuth.token);
        // send json object with token and user record
        res.status(200).json(req.basicAuth);
    } else {
        res.status(403).send('invaled login');
    }
}

function getAllUsers(req, res) {
    if (req.basicAuth.token) {
        users.find().then(result => {
            res.status(200).json(result);
        });
    } else {
        res.status(403).send('invaled login');
    }
}

function oAuthSignunHandler(req,res){
    res.status(200).send(req.token);
}



module.exports = router;
