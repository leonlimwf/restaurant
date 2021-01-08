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

router.get("/users/:id", usersDBObject.getUserInfo);

router.get("/users/:id/reviewHistory", usersDBObject.getUserReviewHistory);

router.delete("/delete", usersDBObject.deleteAccount);

router
    .route("/profile")
    .put(usersDBObject.updateUserInfo)

router
    .route("/review/:id")
    .get(usersDBObject.getReview)
    .put(usersDBObject.editReview)
    .delete(usersDBObject.deleteReview)

router
    .route("/review")
    .post(usersDBObject.addReview)

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