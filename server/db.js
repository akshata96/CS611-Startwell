const mysql = require("mysql");

const establishConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: 'startwelldb',
    insecureAuth: true
});

exports.establishConnection = establishConnection;