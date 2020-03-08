const serverless = require("serverless-http");
const express = require("express");
const hbs = require('hbs');
const path = require("path");

const app = express();


// Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/comps', require('./getComps/'));

// Set handlebars partials folder
hbs.registerPartials(__dirname + '/views/partials');

// Middleware
app.use(express.urlencoded({ extended: true }));

app.set('views',path.join(__dirname,"views"))
app.set("view engine","hbs")

module.exports.homeUI = serverless(app);


