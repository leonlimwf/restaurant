"use strict"

class users {
    constructor(id, user_id, last_name, first_name, password) {
        this.id = id;
        this.user_id = user_id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.user_id;
    }
    getLastName() {
        return this.last_name;
    }
    getFirstName() {
        return this.first_name;
    }
    getPassword() {
        return this.password;
    }
}
module.exports = users;