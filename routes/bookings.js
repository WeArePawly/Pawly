const router = require("express").Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Service = require("../models/Service");

// The available slots for service are updated
// I need to pass that in from the front end --> Update that as well (in group size)

router.put('/:serviceId', (req, res) => {
  const {user} = req.session.passport;
  Service.findByIdAndUpdate(req.params.serviceId, 
    {$push: {booked_by: user}}, {new: true}) 
  .then(bookedService => {
    User.findByIdAndUpdate(user, {$push: {bookings: bookedService._id}}, {new: true})
    .then(updatedUser => {
      res.status(200).json(updatedUser);
        // redirect to somewhere
      })
  })
  .catch(err => res.json(err))
})

module.exports = router;