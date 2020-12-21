"use strict"
const express = require('express')
const userdb = require('../models/UserDB');
const path = require('path');
const { request } = require('express');
const usersDBObject = new userdb();

const router = express.Router();

router.get('/profile/:id', function(req, res) {
    res.send(`you got to see profile with id of ${req.params.id}`)
})

// router.get("/seeres", usersDBObject.getAllUsers);

router.post("/login", usersDBObject.getLoginCredentials);
router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../public/login.html'));
    console.log(__dirname)
});

router
    .route("/register")
    .post(usersDBObject.getRegistrationCredentials)
    .get((req, res) => {
        res.sendFile(path.join(__dirname + '../../../public/register.html'));
    });


module.exports = router;