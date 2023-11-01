const mysql = require('mysql');
const fs = require('fs');
const { database, server, user, password } = require('./serverconfig');
const path = require('path');


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