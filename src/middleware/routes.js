// 'use strict';

// // require express
// const express = require('express');


// // require users model >> connected to schema
// const users = require('../auth/models/users/users-model.js');

// //middleware basicauth

// const basicAuth = require('../auth/middleware/basicAuth.js');



// // express Router
// const router = express.Router();

// //--------------------------------------routes-------------------------


// router.post('/signup', (req, res)=> {
//     console.log("hiiii")
//     users.create(req.body).then(user => { //user : object saved 
//         console.log("i am the saved obj ",user)
//         // return token
//         // let token = users.generateToken(user);
//         // res.status(200).send(token);
//         res.status(200).json(user);
    
//     }).catch(e => res.status(403).send("error !!"));
// });

// router.post('/signin', basicAuth, (req, res)=> { //basicAuth is a middleware (seperate file)
//    res.status(200).send(req.token);
// });

// router.get('/users', (req, res)=> {
//     // list all users 
//    res.status(200).json(users.list());
// });

// module.exports = router;

