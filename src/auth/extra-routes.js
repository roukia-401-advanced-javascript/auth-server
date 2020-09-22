'use strict';

// require express
const express = require('express');

//require schema
const users = require('./models/users/users-schema');

//middleware bearerAuth
const bearerAuth = require('./middleware/bearerAuth');

// express Router
const router = express.Router();


router.get('/secret', bearerAuth, getuser);

function getuser(req, res) {
    console.log(req.user);
    res.status(200).json(req.user.user);
}

module.exports = router;


