const router = require("express").Router();
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');

//https://www.npmjs.com/package/address-validator
router.get("/address", (req, res) => {
  res.render("address");
});

addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
    console.log('input: ', address.toString())
    console.log('match: ', _.map(exact, function(a) {
      return a.toString();
    }));
    console.log('did you mean: ', _.map(inexact, function(a) {
      return a.toString();
    }));
 
    //access some props on the exact match
    var first = exact[0];
    console.log(first.streetNumber + ' '+ first.street);
});

module.exports = router;