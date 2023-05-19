const express = require('express');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const { database, server, user, password } = require('./serverconfig.js');

const PORT = process.env.PORT || 3000;
const app = express();

const config =
{
    host: `${server}.mysql.database.azure.com`,
    user: `${user}`,
    password: `${password}`,
    database: `${database}`,
    port: 3306,
    ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
};

const conn = new mysql.createConnection(config);
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


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
