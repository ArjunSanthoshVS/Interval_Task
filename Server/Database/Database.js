const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "interval"
});

function connectToDatabase() {
    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to the database: ' + err);
        } else {
            console.log("Connected to the database!");
        }
    });
}

module.exports = {
    connectToDatabase,
    getConnection: () => con,
};
