"use strict"
var db = require('../lib/db-connection');

class SearchDB {

    searchRestaurant(request, response) {
        var sql =
            `
        SELECT *
        FROM restaurant.restaurant
        WHERE restaurant_name LIKE ?
        ORDER BY restaurant_name ASC
        `
        var value = "%" + request.params.search + "%"
        db.query(sql, value, function(error, result) {
            if (error) {
                response.status(500).send("Error occured")
            } else {
                if (`${result.length}` === 0) {
                    console.log("No results found")
                    response.status(404).send("Nothing found")
                } else {
                    var array = []
                    for (let i = 0; i < result.length; i++) {
                        var restaurantId = result[i].restaurant_id
                        var restaurantName = result[i].restaurant_name
                        var restaurantDisplayPhoto = result[i].restaurant_displayPhoto
                        var restaurantCategory = result[i].restaurant_category
                        var restaurantLink = result[i].restaurant_link
                        var restaurantAddress = result[i].restaurant_address
                        var restaurantRegion = result[i].restaurant_region
                        var restaurantPricing = result[i].restaurant_pricing
                        var restaurantRating = result[i].restaurant_rating
                        var restaurantAbout = result[i].restaurant_about
                        var restaurantPhone = result[i].restaurant_phone
                        var restaurantOpeningHours = result[i].restaurant_openingHours
                        var restaurantReviewsCount = result[i].restaurant_reviewsCount
                        var restaurantStarCount = result[i].restaurant_starCount
                        var restaurantGallery = result[i].restaurant_gallery

                        array.push({
                            "restaurantId": restaurantId,
                            "restaurantName": restaurantName,
                            "restaurantDisplayPhoto": restaurantDisplayPhoto,
                            "restaurantCategory": restaurantCategory,
                            "restaurantLink": restaurantLink,
                            "restaurantAddress": restaurantAddress,
                            "restaurantRegion": restaurantRegion,
                            "restaurantPricing": restaurantPricing,
                            "restaurantRating": restaurantRating,
                            "restaurantAbout": restaurantAbout,
                            "restaurantPhone": restaurantPhone,
                            "restaurantOpeningHours": restaurantOpeningHours,
                            "restaurantReviewsCount": restaurantReviewsCount,
                            "restaurantStarCount": restaurantStarCount,
                            "restaurantGallery": restaurantGallery
                        })

                    }
                    response.send(array)
                }
            }
        })
    }

    searchRestaurantSortByRating(request, response) {
        var sql =
            `
            SELECT * FROM restaurant.restaurant
            WHERE restaurant_name
            LIKE ?
            ORDER BY restaurant_rating DESC
        `
        var value = request.params.search + "%"
        db.query(sql, value, function(error, result) {
            if (error) {
                response.status(500).send("Error occured")
            } else {
                if (`${result.length}` === 0) {
                    console.log("No results found")
                    response.status(404).send("Nothing found")
                } else {
                    var array = []
                    for (let i = 0; i < result.length; i++) {
                        var restaurantId = result[i].restaurant_id
                        var restaurantName = result[i].restaurant_name
                        var restaurantDisplayPhoto = result[i].restaurant_displayPhoto
                        var restaurantCategory = result[i].restaurant_category
                        var restaurantLink = result[i].restaurant_link
                        var restaurantAddress = result[i].restaurant_address
                        var restaurantRegion = result[i].restaurant_region
                        var restaurantPricing = result[i].restaurant_pricing
                        var restaurantRating = result[i].restaurant_rating
                        var restaurantAbout = result[i].restaurant_about
                        var restaurantPhone = result[i].restaurant_phone
                        var restaurantOpeningHours = result[i].restaurant_openingHours
                        var restaurantReviewsCount = result[i].restaurant_reviewsCount
                        var restaurantStarCount = result[i].restaurant_starCount
                        var restaurantGallery = result[i].restaurant_gallery

                        array.push({
                            "restaurantId": restaurantId,
                            "restaurantName": restaurantName,
                            "restaurantDisplayPhoto": restaurantDisplayPhoto,
                            "restaurantCategory": restaurantCategory,
                            "restaurantLink": restaurantLink,
                            "restaurantAddress": restaurantAddress,
                            "restaurantRegion": restaurantRegion,
                            "restaurantPricing": restaurantPricing,
                            "restaurantRating": restaurantRating,
                            "restaurantAbout": restaurantAbout,
                            "restaurantPhone": restaurantPhone,
                            "restaurantOpeningHours": restaurantOpeningHours,
                            "restaurantReviewsCount": restaurantReviewsCount,
                            "restaurantStarCount": restaurantStarCount,
                            "restaurantGallery": restaurantGallery
                        })

                    }
                    response.send(array)
                }
            }
        })
    }

    searchRestaurantSortByPricing(request, response) {
        var sql =
            `
            SELECT * FROM restaurant.restaurant 
            WHERE restaurant_name LIKE ?
            ORDER BY case restaurant_pricing WHEN "$" THEN 1
            WHEN "$$" THEN 2
            WHEN "$$$" THEN 3
            end
            `
        var value = request.params.search + "%"
        db.query(sql, value, function(error, result) {
            if (error) {
                response.status(500).send("Error occured")
            } else {
                if (`${result.length}` === 0) {
                    console.log("No results found")
                    response.status(404).send("Nothing found")
                } else {
                    var array = []
                    for (let i = 0; i < result.length; i++) {
                        var restaurantId = result[i].restaurant_id
                        var restaurantName = result[i].restaurant_name
                        var restaurantDisplayPhoto = result[i].restaurant_displayPhoto
                        var restaurantCategory = result[i].restaurant_category
                        var restaurantLink = result[i].restaurant_link
                        var restaurantAddress = result[i].restaurant_address
                        var restaurantRegion = result[i].restaurant_region
                        var restaurantPricing = result[i].restaurant_pricing
                        var restaurantRating = result[i].restaurant_rating
                        var restaurantAbout = result[i].restaurant_about
                        var restaurantPhone = result[i].restaurant_phone
                        var restaurantOpeningHours = result[i].restaurant_openingHours
                        var restaurantReviewsCount = result[i].restaurant_reviewsCount
                        var restaurantStarCount = result[i].restaurant_starCount
                        var restaurantGallery = result[i].restaurant_gallery

                        array.push({
                            "restaurantId": restaurantId,
                            "restaurantName": restaurantName,
                            "restaurantDisplayPhoto": restaurantDisplayPhoto,
                            "restaurantCategory": restaurantCategory,
                            "restaurantLink": restaurantLink,
                            "restaurantAddress": restaurantAddress,
                            "restaurantRegion": restaurantRegion,
                            "restaurantPricing": restaurantPricing,
                            "restaurantRating": restaurantRating,
                            "restaurantAbout": restaurantAbout,
                            "restaurantPhone": restaurantPhone,
                            "restaurantOpeningHours": restaurantOpeningHours,
                            "restaurantReviewsCount": restaurantReviewsCount,
                            "restaurantStarCount": restaurantStarCount,
                            "restaurantGallery": restaurantGallery
                        })

                    }
                    response.send(array)
                }
            }
        })
    }
}
module.exports = SearchDB;