const router = require("express").Router();
const User = require('../models/User');
const Vendor = require('../models/Vendor');

router.get('/:vendorId', (req, res, next) => {
  User
  .find({vendor_id: req.params.vendorId})
  .populate('vendor_id')
  .then(user => {
    res.status(200).json(user[0])
  })
  .catch(err => {
    res.status(404).json({ message: `Error while loading profile: ${err}` })
  })
});

router.put('/:vendorId', (req, res, next) => {
  const {
    email,
    first_name,
    last_name,
    business_name,
    street,
    house_number,
    additional_address_info,
    postal_code,
    city,
    business_type
  } = req.body;
  User
    .findOneAndUpdate(
      {vendor_id: req.params.vendorId},
      {
        full_name: {first_name, last_name},
        contact: {email},
       },
      { new: true }
    )
    .then(editedUser => {
      Vendor
      .findByIdAndUpdate(req.params.vendorId,
        {
          business_name,
          address: {
            street,
            house_number,
            additional_info: additional_address_info,
            postal_code,
            city,
          },
          business_type
        },
        { new: true }
      )
      .then(editedVendor => {
        res.status(200).json({editedUser, editedVendor});
      })
      .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});


module.exports = router;