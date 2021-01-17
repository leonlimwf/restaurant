"use strict";
var validator = require("email-validator");
const { response } = require("express");
var session = require('express-session');
var db = require('../lib/db-connection');
const User = require('./User');

class userDB {

    getLoginCredentials(request, respond) {
        var userid = request.body.userId;
        var password = request.body.userPassword;
        var msg = "";
        var success = false;

        var sql = "SELECT user_password, user_id FROM restaurant.user where user_userId = ?"

        db.query(sql, [userid], function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result)
                if (result.length > 0) {
                    if (password == result[0].user_password) { //result[0].password comes from db
                        success = true;
                        request.session.userId = result[0].user_id
                        console.log("request sess id", request.session.userId)
                        msg = "<strong style='color: white; font-family: prod'>It's a success! Hang tight!</strong>";
                        console.log(success);

                    } else {
                        console.log(request.session)
                        msg = '<strong>Oh No!</strong> Incorrect password, try again?'
                        respond.status(401)
                        success = false;
                        console.log("Wrong password");
                    }
                } else {
                    msg = '<strong>Oh No!</strong> We are unable to find your account!'
                    respond.status(401)
                    success = false;
                    console.log("Wrong credentials");
                }
                respond.json(prepareMessage(msg, success));
            }
        });
    }

    getRegistrationCredentials(request, respond) {
        var d = new Date();
        var date = d.getUTCDate();
        var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
        var year = d.getUTCFullYear();

        var userIdInput = request.body.userIdInput;
        var passwordInput = request.body.passwordInput;
        var firstNameInput = request.body.firstNameInput;
        var lastNameInput = request.body.lastNameInput;
        var genderInput = request.body.genderInput;
        var addressInput = request.body.addressInput;
        var phoneNumInput = request.body.phoneNumInput;
        var emailInput = request.body.emailInput;
        var dateStr = year + "-" + month + "-" + date;
        var msg = "";
        var regSuccess = false;

        var emailValid = validator.validate(emailInput)
        if (emailValid) {
            console.log(`Email valid, Input Received was ${emailInput}`)
            var values = [userIdInput, passwordInput, firstNameInput, lastNameInput, genderInput, addressInput, phoneNumInput, emailInput, dateStr]
            var sqlreg = "INSERT INTO restaurant.user (user_userId,user_password, user_firstName, user_lastName, user_gender, user_address, user_mobileNum, user_email, user_joinDate) VALUES (?)";
            db.query(sqlreg, [values], function(error, result) {
                if (error) {
                    let errorMessage = error.sqlMessage.split(" ")
                    let errorOccur = errorMessage[2]
                    if (error.errno === 1062) {
                        respond.status(403)
                        msg = "<strong style='color: red; font-family='prodmed''>" + errorOccur + " has already been taken, please try another one.</strong>";
                    }
                    respond.json(prepareMessage(msg, regSuccess));
                } else {
                    if (result["insertId"] > 0) {
                        regSuccess = true;
                        msg = "<strong style='color: limegreen'>It's a success! Hang tight!</strong>";
                        console.log(regSuccess);
                    } else {
                        msg = '<strong>Oh No!</strong> Some error have occured!'
                        respond.status(403)
                        console.log("Error Occured");
                    }

                    respond.json(prepareMessage(msg, regSuccess));
                }
            });
        } else {
            msg = "<strong style='color: red; font-family: prodmed'>Invalid email detected</strong>";
            console.log(`Email Invalid, Input Received was ${emailInput}`)
            respond.json(prepareMessage(msg))
        }
    }

    getReview(request, respond) {
        var sql = `
        SELECT review_id, review.user_id, user_userId, review.restaurant_id , restaurant_name, review_content, review_rating,review_date
        FROM restaurant.review
        INNER JOIN user
        ON user.user_id = restaurant.review.user_id
        INNER JOIN restaurant
        ON restaurant.restaurant_id = restaurant.review.restaurant_id
        WHERE review_id = ?
        `
        var values = [request.params.id]
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error
            } else {
                console.log(result)
                respond.status(200).send(result)
            }
        })
    }

    addReview(request, respond) {
        var m = new Date();
        var dateString =
            m.getUTCFullYear() + "-" +
            ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
            ("0" + m.getUTCDate()).slice(-2) + " " +
            ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2);
        var sql = "INSERT INTO restaurant.review (review_content, review_rating,review_date, user_id, restaurant_id) VALUES (?, ?, ?, ?,?);"

        var values = [request.body.review_content, request.body.review_rating, dateString, request.body.user_id, request.body.restaurant_id]
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error
            } else {
                console.log(result)
                console.log("Succesfully inserted data")
                respond.status(200).send(result)
            }
        })
    }

    editReview(request, response) {
        var m = new Date();
        var dateString =
            m.getUTCFullYear() + "-" +
            ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
            ("0" + m.getUTCDate()).slice(-2) + " " +
            ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2);

        if (request.body.review_rating && !request.body.review_content) {
            var sql = "UPDATE restaurant.review SET review_rating = ?, review_date = ? WHERE (review_id = ?);"
            var values = [request.body.review_rating, dateString, request.params.id]
        } else if (request.body.review_content && !request.body.review_rating) {
            var sql = "UPDATE restaurant.review SET review_content = ? , review_date = ? WHERE (review_id = ?);"
            var values = [request.body.review_content, dateString, request.params.id]
        } else if (request.body.review_rating && request.body.review_content) {
            var sql = "UPDATE restaurant.review SET review_content = ? , review_rating = ?, review_date = ? WHERE (review_id = ?);"
            var values = [request.body.review_content, request.body.review_rating, dateString, request.params.id]
        }

        db.query(sql, values, function(error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log("Succesfully updated data")
                response.status(200).send(result)
            }
        })
    }

    deleteReview(request, response) {
        var sql = "DELETE FROM restaurant.review WHERE (review_id = ?);"
        var values = request.params.id

        db.query(sql, values, function(error, result) {
            if (error) {
                throw error
            } else {
                console.log(`Succesfully deleted data of id ${request.params.id}`)
                response.status(200).send(result)
            }
        })
    }

    getUserInfo(request, respond) {
        var sql = `SELECT * FROM restaurant.user WHERE user_userId = ?`;
        var value = request.params.id
        console.log(value)
        db.query(sql, value, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result)

            }
            respond.send(result)
        });
    }

    updateUserInfo(request, respond) {
        if (request.body.password) {
            // user change password
            var sql = "UPDATE restaurant.user SET user_password = ? WHERE user_id = ?";
            var values = [request.body.password, request.body.user_id];
        } else if (request.body.email) {
            // user change email
            var sql = "UPDATE restaurant.user SET user_email = ? WHERE user_id = ?";
            var values = [request.body.email, request.body.user_id];
        } else if (request.body.address) {
            // user change address
            var sql = "UPDATE restaurant.user SET user_address = ? WHERE user_id = ?";
            var values = [request.body.address, request.body.user_id];
        } else if (request.body.imageUrl) {
            //update profile pic
            var sql = "UPDATE restaurant.user SET user_imageUrl = ? WHERE user_id = ?"
            var values = [request.body.imageUrl, request.body.user_id];
        } else if (request.body.imageUrlToDelete) {
            //delete profile pic
            var sql = `UPDATE restaurant.user SET user_imageUrl = NULL WHERE user_id = ?`
            var values = [request.body.user_id];
        }
        db.query(sql, values, function(error, result) {
            if (error) {
                if (error.errno === 1062) {
                    console.log("Duplicate entry for email address")
                    return respond.status(404).send("Duplicate entry for email address")
                } else {
                    console.log(error)
                    return respond.status(404).send("Another error occured")
                }
            } else {
                console.log("Successfully updated user particulars")
                return respond.status(200).json(result)
            }
        });
    }

    deleteAccount(request, respond) { //DONT TOUCH OMG
        var sql = "DELETE from restaurant.user where user_id = ? "
        var id = request.body.user_id
        db.query(sql, id, function(error, result) {
            if (error) {
                throw error
            } else {
                console.log(`Successfully deleted account of user ID ${id}`)
                return respond.status(200).json(result)
            }
        })
    }

    getUserReviewHistory(request, response) {
        var sql = `
        SELECT review_id, user.user_id, user.user_userId, review_content, review_rating, review_date, restaurant_name, restaurant.restaurant_id
        FROM restaurant.review
        INNER JOIN user
        ON user.user_id = restaurant.review.user_id
        INNER JOIN restaurant
        ON restaurant.restaurant_id = restaurant.review.restaurant_id
        WHERE user_userId = ?
        ORDER BY review_date DESC
        `
        var value = request.params.id
        db.query(sql, value, function(error, result) {
            if (error) {
                throw error
            } else {
                console.log(result)
                response.status(200).send(result)
            }
        })
    }

}

function prepareMessage(msg, success, regSuccess) {
    var obj = { "message": msg, "success": success, "regSuccess": regSuccess };
    return obj;
}

module.exports = userDB;