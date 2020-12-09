"use strict";
const { stat } = require('fs');
var db = require('../lib/db-connection');
const User = require('./User');

class userDB {

    getLoginCredentials(request, respond) {
        var userid = request.body.userId;
        var password = request.body.userPassword;
        var msg = "";
        var success = false;

        var sql = "SELECT password FROM users WHERE user_id = ?";

        db.query(sql, [userid], function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(JSON.stringify(result, null, 2));
                if (result.length > 0) {
                    if (password == result[0].password) { //result[0].password comes from db
                        console.log(typeof result)
                        success = !false;
                        msg = "<strong style='color: limegreen'>It's a success! Hang tight!</strong>";
                        console.log(success);

                    } else {
                        msg = '<strong>Oh No!</strong> Incorrect password, try again?'
                        console.log("Wrong password");
                    }
                } else {
                    msg = '<strong>Oh No!</strong> We are unable to find your account!'
                    console.log("Wrong credentials");
                }
                respond.json(prepareMessage(msg, success));
            }
        });
    }

    getRegistrationCredentials(request, respond) {
        var userIdInput = request.body.userIdInput;
        var passwordInput = request.body.passwordInput;
        var firstNameInput = request.body.firstNameInput;
        var lastNameInput = request.body.lastNameInput;
        var msg = "";
        var regSuccess = false;

        var values = [userIdInput, lastNameInput, firstNameInput, passwordInput]
        var sqlreg = "INSERT INTO movie_review.users (user_id,last_name, first_name, password) VALUES (?)";

        db.query(sqlreg, [values], function(error, result) {
            if (error) {
                if (error.errno === 1062) {
                    msg = "<strong style='color: red'>Duplicated Id</strong>";
                }

                respond.json(prepareMessage(msg, regSuccess));
            } else {
                console.log(JSON.stringify(result, null, 2));
                if (result["insertId"] > 0) {
                    regSuccess = true;
                    msg = "<strong style='color: limegreen'>It's a success! Hang tight!</strong>";
                    console.log(regSuccess);
                } else {
                    msg = '<strong>Oh No!</strong> Some error have occured!'
                    console.log("Error Occured");
                }

                respond.json(prepareMessage(msg, regSuccess));
            }
        });
    }

    getAllUsers(request, respond) {
        var sql = "SELECT * FROM movie_review.users";
        db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    updateUserFirstName(request, respond) {

        var userObject = new User(request.params.userid, request.body.firstname);

        var sql = "UPDATE movie_review.users SET first_name = ? WHERE user_id = ?";
        var values = [userObject.getFirstName(), userObject.getUserId()];
        db.query(sql, values, function(error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }





}

function prepareMessage(msg, success, regSuccess) {
    var obj = { "message": msg, "success": success, "regSuccess": regSuccess };
    return obj;
}

module.exports = userDB;