const router = require("express").Router();
const User = require('../models/User');
const uploader = require("../config/cloudinary");

router.patch(`/:userId`, uploader.single("path"), (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, 
    
    {avatar: { path: req.file.path }}
    
  )
  .then((editedPicture) => {
    console.log(editedPicture)
    res
      .status(200)
      .json({
        message: "Die Änderungen wurden erfolgreich gespeichert.",
      });
  })
  .catch((err) => {
    res.status(400).json({
      message: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
    });
  });
})

module.exports = router;