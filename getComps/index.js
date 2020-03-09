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
  // .custom(
    // let obj = await getJSON('http://site.com/json.api')process.env.locationIQKey
  
  
  , (req, res) => {
    const errors = validationResult(req);
    let obj = checkAddress(req.body.address_field);
    if (!errors.isEmpty()) {
      res.render("address", { errors : errors.array() });
    } else {
      obj.then(function(val) { 
        console.log(typeof val);
        console.log(val);
        res.render("address", { result : JSON.stringify(val) });
    });
      
    }
});

module.exports = router;

async function checkAddress(val) {
  var bent = require('bent');
  var getJSON = bent('json');
  console.log("val = "+val);
  try {
    return await getJSON("https://us1.locationiq.com/v1/search.php?"
      +"key=" + process.env.locationIQKey 
      +"&q=" + val
      +"&format=json");
  } catch (e) {
    console.log("error = "+e);
    return e
  }
 }