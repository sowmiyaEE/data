//initialize express app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan')
const http = require("http");
let app = express();
const tx = require("./models");
global.tx= tx;
const imports = require('./initialize/imports');
const server = http.createServer(app);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(
  express.urlencoded({extended: true})
);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
imports.initialize(app);
app.listen('8090', () => {
  console.log(`Server Running on 8090`);
});
