const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
var cookie = require('cookie')

const app = express();
const routes = require('./routes');

const middlewares = [
  bodyParser.urlencoded({ extended: true }),
];
app.use(middlewares);
app.use('/', routes);

app.set('views',path.join(__dirname,"views"))
app.set("view engine","hbs")

module.exports.homeUI = serverless(app);