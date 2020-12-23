"use strict"

class users {
    constructor(userid, user_userId, user_firstName, user_lastName, user_password) {
        this.userid = userid;
        this.user_userId = user_userId;
        this.user_firstName = user_firstName;
        this.user_lastName = user_lastName;
        this.user_password = user_password;
    }
    getId() {
        return this.userid;
    }
    getUserId() {
        return this.user_userId;
    }
    getLastName() {
        return this.user_lastName;
    }
    getFirstName() {
        return this.user_firstName;
    }
    getPassword() {
        return this.user_password;
    }
}
module.exports = users;