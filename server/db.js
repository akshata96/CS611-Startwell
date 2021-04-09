var mysql = require('mysql');

// var conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root1234",
//     database : 'startwellDB',
//     dateStrings:true,
//     insecureAuth : true
//   });
  





  var conn = mysql.createConnection({
    host: "startwelldev-do-user-8952772-0.b.db.ondigitalocean.com",
    user: "doadmin",
    password: "nzos5dkm38fdhod5",
    port:25060,
    database : 'StartwellDB',
    dateStrings:true,
    insecureAuth : true
  }); 


  
module.exports = {
    conn
}
    