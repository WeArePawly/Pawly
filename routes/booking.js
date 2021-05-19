const router = require("express").Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Service = require("../models/Service");

// The available slots for service are updated
// I need to pass that in from the front end --> Update that as well (in group size)

router.get('/:serviceId', (req,res,next) => {
  Service.findById( {_id:req.params.serviceId} )
  .then(foundService => res.status(200).json(foundService))
  .catch(err => res.json(err))
})

router.put('/:serviceId', (req, res) => {
  console.log(req.body);
  const {chooseDate , courseId} = req.body;
  const {user} = req.session.passport;
  User.findByIdAndUpdate(user, {$push: {bookings: courseId}}, {new: true})
    .then(updatedUser => {
      res.status(200).json(updatedUser);
        // redirect to somewhere
      })
    .catch(err => res.json(err))
})

module.exports = router;