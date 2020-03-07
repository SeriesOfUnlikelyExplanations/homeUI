const serverless = require("serverless-http");
const express = require("express");
const hbs = require('hbs');
const path = require("path");

const app = express();
const routes = require('./routes');

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.set('views',path.join(__dirname,"views"))
app.set("view engine","hbs")

module.exports.homeUI = serverless(app);

// Set handlebars partials folder
hbs.registerPartials(__dirname + '/views/partials');
