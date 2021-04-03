var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : 'startwelldb2',
    dateStrings:true,
    insecureAuth : true
  });
  



module.exports = {
    conn
}
    