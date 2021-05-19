const router = require("express").Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Service = require("../models/Service");

router.get('/:serviceId', (req, res) => {
  Service.findById( {_id:req.params.serviceId} )
  .then(foundService => res.status(200).json(foundService))
  .catch(err => res.json(err))
})

router.put('/:serviceId', (req, res) => {
  console.log(req.body);
  const {chooseDate , courseId, userId, groupSize} = req.body;
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