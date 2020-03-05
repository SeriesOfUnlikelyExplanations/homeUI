const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
var cookie = require('cookie')

const app = express();

app.set('views',path.join(__dirname,"views"))
app.set("view engine","hbs")


app.get("/", (req, res) => {
  res.status(200).render("index");
});


module.exports.homeUI = serverless(app);