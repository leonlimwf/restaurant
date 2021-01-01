"use strict"
const express = require('express')
const restaurantdb = require('../models/RestaurantDB');
const restaurantDBObject = new restaurantdb();

const router = express.Router();

router.get("/id/:id", restaurantDBObject.getRestaurants);

router.get("/category/:category", restaurantDBObject.getRestaurantsByCategory)

router.get("/category/:category/sortRating", restaurantDBObject.getRestaurantsByCategorySortRating)

router.get("/category/:category/sortPricing", restaurantDBObject.getRestaurantsByCategorySortPricing)

router.get("/all", restaurantDBObject.getAllRestaurants)

module.exports = router;