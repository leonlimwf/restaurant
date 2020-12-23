"use strict"
const express = require('express')
const path = require('path');
const { request } = require('express');
const search = require('../models/search');
const searchObject = new search();

const router = express.Router();

router.get("/search/:search", searchObject.searchRestaurant);

module.exports = router;