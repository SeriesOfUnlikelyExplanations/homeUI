const router = require("express").Router();
const { check, validationResult } = require('express-validator');

//https://appdividend.com/2018/02/06/express-form-validation-tutorial/
//https://www.npmjs.com/package/address-validator
router.get("/address", (req, res) => {
  res.render("getComps/address");
});

router.post("/address",
  check('address_field').not().isEmpty().withMessage((val, { req })  => 'Address cannot be blank ' + val).bail()
  , (req, res) => {
    const errors = validationResult(req);
    let obj = checkAddress(req.body.address_field);
    if (!errors.isEmpty()) {
      res.render("address", { errors : errors.array() });
    } else {
      obj.then(function(val) {
        // if( val.length > 1) {
          res.render("getComps/address", { result : Array.from(val, x => x['display_name']) });
        // } else {
          // res.render("getComps/address", { result : ['Success!'] });
        // }
      });
    }
});

module.exports = router;

async function checkAddress(val) {
  var bent = require('bent');
  var getJSON = bent('json');
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
