const mysql = require('mysql');
const fs = require('fs');
const { database, server, user, password } = require('./serverconfig');
const path = require('path');


//database config
const config =
{
    host: `${server}.mysql.database.azure.com`,
    user: `${user}`,
    password: `${password}`,
    database: `${database}`,
    port: 3306,
    ssl: {ca: fs.readFileSync(path.join(__dirname, './DigiCertGlobalRootCA.crt.pem'))}
};


const conn = new mysql.createConnection(database);
conn.connect(
  function (err) {
      if (err) {
          console.log("!!! Cannot connect !!! Error:");
          throw err;
      }
      else {
          console.log("Connection established.");
      }
  });

module.exports = conn;