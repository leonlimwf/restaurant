const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'movie_review'
})

module.exports = connection;