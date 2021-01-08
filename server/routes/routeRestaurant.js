"use strict"
const express = require('express')
const restaurantdb = require('../models/RestaurantDB');
const restaurantDBObject = new restaurantdb();

const router = express.Router();

//there is a /restaurants infront btw

router.get("/id/:id", restaurantDBObject.getRestaurants);

router.get("/id/:id/sortReviewRating", restaurantDBObject.getRestaurantSortReviewRating)

router.get("/id/:id/sortReviewDate", restaurantDBObject.getRestaurantSortReviewDate)

router.get("/category/:category", restaurantDBObject.getRestaurantsByCategory)

router.get("/category/:category/sortRating", restaurantDBObject.getRestaurantsByCategorySortRating)

router.get("/category/:category/sortPricing", restaurantDBObject.getRestaurantsByCategorySortPricing)

router.get("/all/feature/:featureName", restaurantDBObject.getRestaurantsSortByFeatures)

router.get("/all/region/:restaurantRegion", restaurantDBObject.getRestaurantsSortByRegion)

router.get("/all", restaurantDBObject.getAllRestaurants)

module.exports = router;