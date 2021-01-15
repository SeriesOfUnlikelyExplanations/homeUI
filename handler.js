const serverless = require("serverless-http");
const express = require('express');
const handlebars = require('express-handlebars');
const path = require("path");

const standard_app = function(app) {
  app.use('/assets', express.static(path.join(__dirname, '/assets')))

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  //views
  app.set("view engine","hbs")
  app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views',
    defaultLayout: 'layout',
    extname: 'hbs'
  }));
  app.set('views',path.join(__dirname, "views"))
}

var publicApp = express();
standard_app(publicApp)
// Routing
require('./publicRoutes')(publicApp);
module.exports.public = serverless(publicApp);

var privateapp = express();
standard_app(privateapp)
// Routing
require('./privateRoutes')(privateapp);
module.exports.private = serverless(privateapp);
