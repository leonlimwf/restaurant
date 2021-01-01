"use strict"
const express = require('express')
const path = require('path');
const { request } = require('express');
const search = require('../models/search');
const searchObject = new search();

const router = express.Router();

router.get("/search/:search", searchObject.searchRestaurant);

router.get("/search/:search/sortRating", searchObject.searchRestaurantSortByRating);

router.get("/search/:search/sortPricing", searchObject.searchRestaurantSortByPricing);

module.exports = router;