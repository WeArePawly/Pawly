const router = require("express").Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Service = require("../models/Service");

router.get('/:serviceId', (req, res) => {
  Service.findById( {_id:req.params.serviceId} )
  .then(foundService => res.status(200).json(foundService))
  .catch(err => res.json(err))
});

// get services that owners have booked
router.get('/:ownerId/services', (req,res) => {
  Service.find({"booking.booked_by" : req.params.ownerId })
  .then(bookedServices => res.status(200).json(bookedServices))
})

// get services for vendors to see who has booked
router.get('/services/:vendorId', (req,res) => {
  Service.find({vendor_id: req.params.vendorId})
  .then(bookedServices => res.status(200).json(bookedServices))
});

// booking process
router.put('/:serviceId', (req, res) => {
  console.log(req.body);
  const {chooseDate, courseId, userId} = req.body;
  const {user} = req.session.passport;

  User.findByIdAndUpdate(user, {$push: {bookings: courseId}}, {new: true})
  .then(updatedUser => {
    Service.findByIdAndUpdate(courseId, {$push: { booking: {booked_dates: chooseDate, booked_by : userId}}}, {new:true})
    .then(response => console.log(response))
    .catch(err => res.json(err))
  })
})

module.exports = router;