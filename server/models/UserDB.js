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
                if (result.length > 0) {
                    if (password == result[0].password) {
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

function prepareMessage(msg, success) {
    var obj = { "message": msg, "success": success };
    return obj;
}

module.exports = userDB;