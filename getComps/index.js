const router = require("express").Router();
var addressValidator = require('address-validator');
const { check, validationResult } = require('express-validator');
var _ = require('underscore');

//https://appdividend.com/2018/02/06/express-form-validation-tutorial/
//https://www.npmjs.com/package/address-validator
router.get("/address", (req, res) => {
  res.render("address");
});

router.post("/address", 
  check('address_field').not().isEmpty().withMessage((val, { req })  => 'Address cannot be blank ' + val).bail()
  // .custom(address => {
    // addressValidator.validate(address, addressValidator.match.unknown, function(err, exact, inexact){
      // console.log('input: ', address.toString())
      // console.log('match: ', _.map(exact, function(a) {
        // return a.toString();
      // }));
      // console.log('did you mean: ', _.map(inexact, function(a) {
        // return a.toString();
      // }));
      // var first = exact[0];
      // console.log(first.streetNumber + ' '+ first.street);
    // })
  // })
  , (req, res) => {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
      res.render("address", { errors : errors.array() });
    } else {
      res.render("address");
    }
});

module.exports = router;