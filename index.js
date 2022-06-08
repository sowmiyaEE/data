//initialize express app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan')
const http = require("http");
let app = express();
const imports = require('./initialize/imports');
const server = http.createServer(app);
const config = require("./config/env"); 
const dotenv = require('dotenv');
dotenv.config();
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
app.listen(config.get('PORT'), () => {
  console.log(`Server Running on ${config.get('PORT')}`);
});

 
