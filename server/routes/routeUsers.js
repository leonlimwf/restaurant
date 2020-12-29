"use strict"
const express = require('express')
const userdb = require('../models/UserDB');
const path = require('path');
const { request } = require('express');
const session = require('express-session')
const usersDBObject = new userdb();

const router = express.Router();

router.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));

router.get("/users/:id", usersDBObject.getAllUsers);
router.put("/update", usersDBObject.updateUserFirstName);
router.delete("/delete", usersDBObject.deleteAccount);

router
    .route("/comment")
    .post(usersDBObject.addComment)
    .put(usersDBObject.editComment)
    .delete(usersDBObject.deleteComment)

router
    .route("/login")
    .post(usersDBObject.getLoginCredentials)
    .get((req, res) => {
        res.sendFile(path.join(__dirname + '../../../public/login.html'));
    });


router
    .route("/register")
    .post(usersDBObject.getRegistrationCredentials)
    .get((req, res) => {
        res.sendFile(path.join(__dirname + '../../../public/register.html'));
    });




module.exports = router;