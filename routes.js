// routes.js
const express = require('express');
const router = express.Router();
const { body,validationResult, sanitizeBody } = require('express-validator/check');

router.get("/", (req, res) => {
  res.status(200).render("index");
});

router.get("/address", (req, res) => {
  res.status(200).render("address");
});

router.post('/address', (req, res) => {
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