var express = require('express');
var router = express.Router();

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
let result = "";
let re = "";
/* GET home page. */
router.get('/', function (req, res, next) {
      var connection = mysql.createConnection({
        host: 'panshubeimysql.mysql.database.azure.com',
        port: '3306',
        user: 'panshubei@panshubeimysql',
        password: 'Jason.446620',
        database: 'mysql',
        ssl: {
            ca: fs.readFileSync(path.resolve(__dirname, 'BaltimoreCyberTrustRoot.crt.pem'))
        }
    });

    connection.connect();
    
    connection.query('SELECT *FROM USER', function (error, results) {
        if (error) throw error;
        for (i = 0;i < results.length; i++) { 
            console.log('The user is: '+results[i].User);
            result += results[i].User+", ";
            console.log('The user is: '+result);
        }
        
    });
  
    setInterval(function () { 
      console.log('debugger: ' + result);
      re=result;
    }, 3000);
    res.render("success", { title: 'Express' });
    connection.end();
});

module.exports = router;
