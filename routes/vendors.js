const router = require("express").Router();
const Service = require("../models/Service");
const Vendor = require('../models/Vendor');

router.post('/:vendorId/addService', (req, res, next) => {
  const {
    name,
    price,
    format,
    street,
    house_number,
    postal_code,
    city,
    operator_name,
    language,
    description,
    start_date,
    end_date,
    group_size,
  } = req.body;
  Service.create({
      name: name,
      price: price,
      format: format,
      location: {street,
        house_number,
        postal_code,
        city},
      operator: {name: operator_name},
      language: language,
      description: description,
      bookings: {
        dates: {start_date, end_date},
        group_size: {total: group_size},
      }
    })
    .then(createdService => {
      console.log(createdService)
      Vendor.findByIdAndUpdate(req.params.vendorId, {
          $push: {services: createdService._id}
        }, {
          new: true
        })
        .then(updatedVendor => {
          console.log(updatedVendor)
          res.status(200).json({
            message: 'A service has been successfully created.'
          });
        })
        .catch(err => res.json(err));
    })
})


router.put('/:vendorId/:serviceId', (req, res, next) => {
  const {
    name,
    price,
    format,
    street,
    house_number,
    postal_code,
    city,
    operator_name,
    language,
    description,
    start_date,
    end_date,
    group_size,
  } = req.body;
  Service.findByIdAndUpdate(
    req.params.serviceId,
    {
      name: name,
      price: price,
      format: format,
      location: {street,
        house_number,
        postal_code,
        city},
      operator: {name: operator_name},
      language: language,
      description: description,
      bookings: {
        dates: {start_date, end_date},
        group_size: {total: group_size},
      }
    }, {new: true}
  )
    .then(serviceUpdated => {
      res.status(200).json(serviceUpdated);
    })
    .catch(err => res.json(err));
});

router.delete('/:vendorId/:serviceId', (req, res) => {
  Service.findByIdAndDelete(req.params.serviceId)
    .then(() => {
      res.status(200).json({ message: 'This service has been deleted' });
    })
})



module.exports = router;