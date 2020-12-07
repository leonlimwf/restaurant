"use strict"
const express = require('express')
const userdb = require('../models/UserDB');
const path = require('path');
const usersDBObject = new userdb();

const router = express.Router();
router.post("/login", usersDBObject.getLoginCredentials);

router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'login.html'));
});



module.exports = router;