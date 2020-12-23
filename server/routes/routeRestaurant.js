"use strict"
const express = require('express')
const restaurantdb = require('../models/RestaurantDB');
const path = require('path');
const { request } = require('express');
const restaurantDBObject = new restaurantdb();

const router = express.Router();

router.get("/id/:id", restaurantDBObject.getRestaurants);

router.get("/category/:category", restaurantDBObject.getRestaurantsByCategory)



module.exports = router;