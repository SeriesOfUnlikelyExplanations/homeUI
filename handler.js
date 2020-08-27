const serverless = require("serverless-http");
const express = require("express");
const handlebars = require('express-handlebars');
const path = require("path");

var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//views
app.set("view engine","hbs")
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views',
  defaultLayout: 'layout',
  extname: 'hbs'
}));

app.set('views',path.join(__dirname,"views"))

// Routing
app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/PrivacyPolicy.html", (req, res) => {
  res.status(200).render("PrivacyPolicy");
});


app.use('/comps', require('./getComps'));

module.exports.rental = serverless(app);

