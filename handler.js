const serverless = require("serverless-http");
const express = require("express");
const handlebars = require('express-handlebars');
const path = require("path");

var app = express();

app.use(express.json())

// Middleware
app.use(express.urlencoded({ extended: true }));


//views
app.set("view engine","hbs")
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views',
  defaultLayout: 'layout',
  extname: 'hbs'
}));
// app.engine('hbs', hbs.express4({
   // partialsDir: __dirname + '/views/partials'
 // }));
app.set('views',path.join(__dirname,"views"))

// Routing
app.get("/", (req, res) => res.render("index"));
app.use('/comps', require('./getComps'));

module.exports.rental = serverless(app);

