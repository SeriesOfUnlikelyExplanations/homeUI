// routes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get("/", (req, res) => {
  res.render("index");
});


//https://www.npmjs.com/package/address-validator
router.get("/address", (req, res) => {
  res.render("address");
});

router.post('/address', [
  check('address_field')
    .isLength({ min: 1 }).withMessage('Address field cannot be blank')
    .matches(/\d/).withMessage('must contain a number')
], (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.render('address', {errors: JSON.stringify(errors)});
  }
  res.render('address', {
    data: req.body, // { address }
    errors: {
      address: {
        msg: 'That address doesn‘t look right'
      }
    }
  });
});

module.exports = router;