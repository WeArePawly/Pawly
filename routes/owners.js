const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/dashboard', (req, res, next) => {
  console.log(req.params.user._id);
  User.findById(req.params.user._id)
  .then(user => {
    console.log(`this is the dashboard of ${user.username}`)
    // if(!user) { res.status(404).json(user) }
    // else { res.status(200).json(user) }
  })
  .catch(err => res.json(err))
});


module.exports = router;