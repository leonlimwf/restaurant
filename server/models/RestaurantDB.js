"use strict"
var db = require('../lib/db-connection');
const { all } = require('../routes/routeRestaurant');

class RestaurantDB {
    getRestaurants(request, response) {
        var sql = "SELECT * FROM restaurant.restaurant"
        var id = request.params.id
        db.query(sql, function(error, result) {
            if (error) {
                console.log(error)
            } else {
                var resId = id.toString()
                console.log("User typed ", resId)
                var resIdResult = resId.slice(-2) - 1
                console.log("Restaurant Result Index of ", resIdResult)

                var restaurant = result[resIdResult]
                var array = []
                var restaurantId = restaurant.restaurant_id
                var restaurantName = restaurant.restaurant_name
                var restaurantDisplayPhoto = restaurant.restaurant_displayPhoto
                var restaurantCategory = restaurant.restaurant_category
                var restaurantLink = restaurant.restaurant_link
                var restaurantAddress = restaurant.restaurant_address
                var restaurantRegion = restaurant.restaurant_region
                var restaurantPricing = restaurant.restaurant_pricing
                var restaurantRating = restaurant.restaurant_rating
                var restaurantAbout = restaurant.restaurant_about
                var restaurantPhone = restaurant.restaurant_phone
                var restaurantOpeningHours = restaurant.restaurant_openingHours
                var restaurantReviewsCount = restaurant.restaurant_reviewsCount
                var restaurantStarCount = restaurant.restaurant_starCount
                var restaurantGallery = restaurant.restaurant_gallery
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
                    // console.log(array)
                response.render('restaurant', { array })
            }

        })
    }

    getRestaurantsByCategory(request, response) {
        var sql = "SELECT * FROM restaurant.restaurant WHERE restaurant_category = ? "
        var value = request.params.category
        db.query(sql, [value], function(error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(`${result.length} result found for ${value} category`)

                var array = []

                for (var i = 0; i < result.length; i++) {
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

                response.render('category', { array })
            }
        });
    }
}

module.exports = RestaurantDB;