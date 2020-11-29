var mysql = require('mysql');

var con = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'mydb'
});

function getConnection() {
    con.getConnection(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

getConnection()