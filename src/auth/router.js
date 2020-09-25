'use strict';

// require express
const express = require('express');

//require schema
const users = require('./models/users/users-schema');

//middleware basicauth

const basicAuth = require('./middleware/basicAuth');


// express Router
const router = express.Router();

//-----------------------------------------------------routes---------------------------------
router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler); //basicAuth is a middleware (seperate file)
router.get('/allusers', basicAuth, getAllUsers);


// router.delete('/deleteuser', (req, res) => {
//     users.deleteOne({}).then((results) => {
//         res.status(200).json(results)
//     })
// })

//---------------------------------------------------functions------------------------------------

async function signUpHandler(req, res) {
    // first check if the username exists then add it if not 
   let results =  await users.findOne({ username: req.body.username })
        if (results) {
            res.status(409).send('user exists! use another username');

        } else {
            let user = new users(req.body);
            // hash the password first by adding hook in the schema 
            let data = await user.save() ;// method to save to db it return the saved user 
                let token = users.generateToken(data); //users is the schema i will pass the username of the saved user
                res.status(200).send(token);
                return;
            }
        }
  
    
        // let user = new users(req.body);
        // let isUserExist = await users.findOne({ username: user.username });
        // // console.log('isUserExist', isUserExist);
        // if (isUserExist) { // to check if the user is already exist and signup 
        //   res.status(403).send('user is already exist');
        //   return;
        // }
        // Users.create(req.body).then(async(user) => {
        //   const token = await Users.generateToken(user);
        //   res.status(200).json({ token });
        //   console.log('req.tok', token);
        // })
        //   .catch((err) => {
        //     console.log('Wrong!!');
        //     res.status(403).send(err.message);
        //   });
      
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




module.exports = router;
