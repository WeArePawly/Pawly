const router = require("express").Router();
const User = require('../models/User');

router.put('/:ownerId', (req, res, next) => {
  const {
    email,
    username,
    first_name,
    last_name,
  } = req.body;
  User
    .findOneAndUpdate(
      {_id: req.params.ownerId},
      {
        full_name: {first_name, last_name},
        contact: {email},
        username,
       },
      { new: true }
    )
    .then(editedUser => {
      res.status(200).json(editedUser);
    })
    .catch(err => {
      res.status(404).json({ message: `Error while editing profile.`})
    })
})

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