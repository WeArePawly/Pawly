const router = require("express").Router();
const User = require('../models/User');

router.get('/:ownerId', (req, res, next) => {
  User.findById(req.params.ownerId)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err =>
    res.status(404).json({ message: `Error while loading profile: ${err}` })
  )
});

module.exports = router;