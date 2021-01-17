"use strict"
var db = require('../lib/db-connection');
const { all } = require('../routes/routeRestaurant');

class RestaurantDB {

    getAllRestaurants(request, response) {
        var sql = "SELECT * FROM restaurant.restaurant ORDER BY restaurant_name ASC"
        db.query(sql, function(error, result) {
            if (error) {
                console.log(error)
            } else {
                response.json(result)
            }
        })
    }


    getRestaurants(request, response) {
        var sql = "SELECT * FROM restaurant.restaurant"
        var id = request.params.id
        db.query(sql, function(error, result) {
            if (error) {
                console.log(error)
            } else {
                var sql2 =
                    `SELECT restaurant.restaurant_contact_id, restaurant_socialMedia, restaurant_email
                FROM restaurant.restaurant
                INNER JOIN restaurant_contact
                WHERE restaurant.restaurant.restaurant_contact_id = restaurant_contact.restaurant_contact_id
                AND restaurant.restaurant.restaurant_id = ?
                `
                var resId = id.toString()
                db.query(sql2, [resId], function(error2, result2) {
                    if (error2) {
                        throw error2
                    } else {
                        var array = []
                        var sql3 = `
                        SELECT features_name
                        FROM restaurant.restaurant_features
                        INNER JOIN restaurant.features
                            ON restaurant.restaurant_features.features_id = restaurant.features.features_id
                        INNER JOIN restaurant.restaurant
                            ON restaurant.restaurant.restaurant_id = restaurant.restaurant_features.restaurant_id
                            AND restaurant.restaurant.restaurant_id = ?`
                        db.query(sql3, [resId], function(error3, result3) {
                            if (error3) {
                                throw error3
                            } else {
                                var sql4 = `
                                SELECT user_userId, review_date, review_rating, review_content
                                FROM restaurant.review
                                INNER JOIN user
                                ON user.user_id = restaurant.review.user_id
                                INNER JOIN restaurant
                                ON restaurant.restaurant_id = restaurant.review.restaurant_id
                                AND restaurant.restaurant_id = ?
                                ORDER BY review.review_date DESC
                                `
                                db.query(sql4, [resId], function(error4, result4) {
                                    if (error4) {
                                        throw error4
                                    } else {
                                        console.log("review", result4)
                                        var resIdResult = resId.slice(-2) - 1
                                        console.log("Restaurant Result Index of ", resIdResult)
                                        var restaurant = result[resIdResult]
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
                                        var restaurantEmail = result2[0].restaurant_email
                                        var restaurantSocialMedia = result2[0].restaurant_socialMedia
                                        var featureArrayList = []
                                        for (var item in result3) {
                                            var feature = result3[item].features_name
                                            featureArrayList.push(feature)
                                        }

                                        var reviewArray = []
                                        for (var i in result4) {
                                            var reviewUserId = result4[i].user_userId
                                            const today = new Date(result4[i].review_date);
                                            today.setHours(today.getHours() + 8);
                                            var reviewDate = today;
                                            var reviewRating = result4[i].review_rating
                                            var reviewContent = result4[i].review_content
                                            reviewArray.push({ reviewUserId, reviewDate, reviewRating, reviewContent })
                                        }
                                        console.log(reviewArray)

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
                                                "restaurantGallery": restaurantGallery,
                                                "restaurantSocialMedia": restaurantSocialMedia,
                                                "restaurantEmail": restaurantEmail,
                                                "restaurantFeatures": featureArrayList,
                                                "reviewArray": reviewArray
                                            })
                                            // console.log(array)
                                        response.send(array)
                                        console.log(array)
                                    }

                                })

                            }
                        })

                    }

                });

            }

        })
    }

    getRestaurantsByCategory(request, response) {
        var sql = "SELECT * FROM restaurant.restaurant WHERE restaurant_category = ? ORDER BY restaurant.restaurant.restaurant_name ASC"
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
                response.send(array)
            }
        });
    }

    getRestaurantsByCategorySortRating(request, response) {
        var sql = "SELECT * FROM restaurant.restaurant WHERE restaurant_category = ? ORDER BY restaurant_rating DESC"
        var value = request.params.category
        db.query(sql, [value], function(error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(`${result.length} result found for ${value} category. Sorted according to ratings`)

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
                response.send(array)
            }
        });
    }

    getRestaurantsByCategorySortPricing(request, response) {
        var sql = `SELECT * FROM restaurant.restaurant WHERE restaurant_category = ?
        ORDER BY case restaurant_pricing WHEN "$" THEN 1
        WHEN "$$" THEN 2
        WHEN "$$$" THEN 3
        end`
        var value = request.params.category
        db.query(sql, [value], function(error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(`${result.length} result found for ${value} category. Sorted according to pricing`)

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
                response.send(array)
            }
        });
    }

    getRestaurantSortReviewRating(request, response) {
        var sql = `
        SELECT user_userId, review_date, review_rating, review_content
        FROM restaurant.review
        INNER JOIN user
        ON user.user_id = restaurant.review.user_id
        INNER JOIN restaurant
        ON restaurant.restaurant_id = restaurant.review.restaurant_id
        AND restaurant.restaurant_id = ?
        ORDER BY review_rating DESC
        `
        var value = request.params.id

        db.query(sql, [value], function(error, result) {
            if (error) {
                console.log(error)
            } else {
                if (result.length > 0) {
                    var reviewArray = []
                    for (var i in result) {
                        var reviewUserId = result[i].user_userId
                        const today = new Date(result[i].review_date);
                        today.setHours(today.getHours() + 8);
                        var reviewDate = today;
                        var reviewRating = result[i].review_rating
                        var reviewContent = result[i].review_content
                        reviewArray.push({ reviewUserId, reviewDate, reviewRating, reviewContent })
                    }
                    response.json(reviewArray)
                } else {
                    response.send("No reviews found")
                }

            }
        });
    }

    getRestaurantSortReviewDate(request, response) {
        var sql = `
        SELECT user_userId, review_date, review_rating, review_content
        FROM restaurant.review
        INNER JOIN user
        ON user.user_id = restaurant.review.user_id
        INNER JOIN restaurant
        ON restaurant.restaurant_id = restaurant.review.restaurant_id
        AND restaurant.restaurant_id = ?
        ORDER BY review_date ASC
        `
        var value = request.params.id

        db.query(sql, [value], function(error, result) {
            if (error) {
                console.log(error)
            } else {
                if (result.length > 0) {
                    var reviewArray = []
                    for (var i in result) {
                        var reviewUserId = result[i].user_userId
                        const today = new Date(result[i].review_date);
                        today.setHours(today.getHours() + 8);
                        var reviewDate = today;
                        var reviewRating = result[i].review_rating
                        var reviewContent = result[i].review_content
                        reviewArray.push({ reviewUserId, reviewDate, reviewRating, reviewContent })
                    }
                    response.json(reviewArray)
                } else {
                    response.send("No reviews found")
                }

            }
        });
    }

    getRestaurantsSortByFeatures(request, response) {
        var sql = `
        SELECT restaurant.restaurant_id, features_name, restaurant.restaurant_name, restaurant.restaurant_rating, restaurant.restaurant_pricing, restaurant.restaurant_region, restaurant.restaurant_address, restaurant.restaurant_displayPhoto
        FROM restaurant.restaurant_features
        INNER JOIN restaurant.features
        ON restaurant.restaurant_features.features_id = restaurant.features.features_id
        INNER JOIN restaurant.restaurant
        ON restaurant.restaurant.restaurant_id = restaurant.restaurant_features.restaurant_id
        WHERE features_name = ?
        ORDER BY restaurant_name ASC`
        var values = request.params.featureName
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error
            } else {
                response.json(result)
            }
        })
    }

    getRestaurantsSortByRegion(request, response) {
        var sql = `SELECT * FROM restaurant.restaurant
        WHERE restaurant_region = ?
        ORDER BY restaurant_name ASC`
        var value = request.params.restaurantRegion
        db.query(sql, value, function(error, result) {
            if (error) {
                throw error
            } else {
                response.json(result)
            }
        })

    }
}

module.exports = RestaurantDB;