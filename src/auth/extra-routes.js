'use strict';

// require express
const express = require('express');

//require schema
const users = require('./models/users/users-schema');

//middleware bearerAuth
const bearerAuth = require('./middleware/bearerAuth');

//middleware acl
const permissions = require('./middleware/permissions-acl');

// express Router
const router = express.Router();

// only for loggedin users
router.get('/secret', bearerAuth, getuser);

// for loggedin users depen on thier roles
router.get('/read', bearerAuth, permissions('read'), readFun);
router.post('/add', bearerAuth, permissions('create'), createFun);
router.put('/change', bearerAuth, permissions('update'), updateFun);
router.delete('/remove', bearerAuth, permissions('delete'),deletefun);



function getuser(req, res) {
    console.log(req.user);
    res.status(200).json(req.user.user);
}


function readFun(req, res) {
    res.status(200).send("read !!!! ")
}

function createFun(req, res) {
    res.status(200).send("created !!!! ")
}

function updateFun(req, res) {
    res.status(200).send("updated !!!! ")
}

function deletefun(req, res) {
    res.status(200).send("DELETED !!!! ")
}
module.exports = router;


