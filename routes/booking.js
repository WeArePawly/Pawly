const router = require("express").Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Service = require("../models/Service");

router.get('/:serviceId', (req, res) => {
  Service.findById( {_id:req.params.serviceId} )
  .then(foundService => res.status(200).json(foundService))
  .catch(err => res.json(err))
})

// get services that owners have booked
router.get('/:ownerId/services', (req,res) => {
  // find the services where owner Id is in bookings
  
  Service.find()
    //services[1].booking[0].booked_by
  .then(allServices => allServices.booking[0].filter(service => {
     return res.json(service.booking.booked_by)
   }))
   

  // : req.params.ownerId

  // .then(response => {
  //   User.findById({booking: {booked_by: req.params.ownerId}})
  //   .then(response => res.status(200).json(response))
  //   .catch(err => res.json(err))
})

router.put('/:serviceId', (req, res) => {
  console.log(req.body);
  const {chooseDate, courseId, userId, groupSize} = req.body;
  const {user} = req.session.passport;

  // Service.findById({courseId: courseId})
  // .then((srv)=>{
  //   if (weCanBook){
  //     Query Stuff from below
  //   } else { res.json(noPlaceLeft)}
  // })

  User.findByIdAndUpdate(user, {$push: {bookings: courseId}}, {new: true})
  .then(updatedUser => {
    Service.findByIdAndUpdate(courseId, {$push: { booking: {booked_dates: chooseDate, booked_by : userId}}}, {new:true})
    .then(response => console.log(response))
    .catch(err => res.json(err))
  })
})

module.exports = router;