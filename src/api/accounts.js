const conn = require("../config/databaseconnection");
const express = require('express');

const accountRouter = express.Router();

async function databaseQuery(query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) {
        reject(`Database Query error: \n ${err}`);
        return;
      }

      resolve(result);
    });
  });
};


module.exports = accountRouter;