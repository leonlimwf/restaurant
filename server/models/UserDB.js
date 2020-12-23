"use strict";
var validator = require("email-validator");
var db = require('../lib/db-connection');
const User = require('./User');

class userDB {

    getLoginCredentials(request, respond) {
        var userid = request.body.userId;
        var password = request.body.userPassword;
        var msg = "";
        var success = false;

        var sql = "SELECT user_password FROM restaurant.user where user_userId = ?"

        db.query(sql, [userid], function(error, result) {
            if (error) {
                throw error;
            } else {
                if (result.length > 0) {
                    if (password == result[0].user_password) { //result[0].password comes from db
                        success = true;
                        msg = "<strong style='color: white; font-family: prod'>It's a success! Hang tight!</strong>";
                        respond.status(200)
                        console.log(success);

                    } else {
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

    addComment(request, respond) {
        var d = new Date();
        var date = d.getUTCDate();
        var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
        var year = d.getUTCFullYear();
        var dateStr = year + "-" + month + "-" + date;
        var sql = "INSERT INTO restaurant.review (review_content, review_rating,review_date, user_id, restaurant_id) VALUES (?, ?, ?, ?,?);"

        var values = [request.body.review_content, request.body.review_rating, dateStr, request.body.user_id, request.body.restaurant_id]

        db.query(sql, values, function(error, result) {
            if (error) {
                throw error
            } else {
                console.log("Succesfully inserted data")
                respond.status(200).send(result)
            }
        })
    }















    getAllUsers(request, respond) {
        var sql = "SELECT * FROM restaurant.user";
        db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                var array = []

                for (var i = 0; i < result.length; i++) {
                    console.log(i)
                    var x = result[i].user_userId;
                    console.log(x)
                    array.push({ "name": x })
                }

                console.log(array)

            }
            respond.send(array)
        });
    }

    updateUserFirstName(request, respond) {
        var sql = "UPDATE restaurant.user SET user_firstName = ? WHERE user_id = ?";
        var values = [request.body.first_name, request.body.id];
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log("Successful")
                return respond.status(200).json(result)
                    // respond.json(result);
            }
        });
    }

    deleteAccount(request, respond) {
        var sql = "DELETE from restaurant.user where user_id='?' "
        var id = request.body.id
        db.query(sql, [id], function(error, result) {
            if (error) {
                throw error
            } else {
                console.log(`Successfully deleted account of user ID ${id}`)
                return respond.status(200).json(result)
            }
        })
    }

}

function prepareMessage(msg, success, regSuccess) {
    var obj = { "message": msg, "success": success, "regSuccess": regSuccess };
    return obj;
}

module.exports = userDB;