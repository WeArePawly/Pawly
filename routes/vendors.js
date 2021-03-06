const router = require("express").Router();
const uploader = require("../config/cloudinary");
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const Service = require("../models/Service");

router.get("/", (req, res, next) => {
  User.find({ vendor_id: { $exists: true } })
    .populate("vendor_id")
    .populate({
      path: "vendor_id",
      populate: {
        path: "services",
        model: "Service",
      },
    })
    .then((vendors) => {
      res.status(200).json(vendors);
    })
    .catch((err) => {
      res.status(404).json({ message: `Error while loading profile: ${err}` });
    });
});

router.get("/:vendorId", (req, res, next) => {
  User.find({ vendor_id: req.params.vendorId })
    .populate("vendor_id")
    .populate({
      path: "vendor_id",
      populate: {
        path: "services",
        model: "Service",
      },
    })
    .then((vendor) => {
      res.status(200).json(vendor[0]);
    })
    .catch((err) => {
      res.status(404).json({ message: `Error while loading profile: ${err}` });
    });
});

router.patch('/:vendorId', (req, res, next) => {
  const {
    rating,
    comment,
    userId,
    username
  } = req.body;
  Vendor.findByIdAndUpdate(req.params.vendorId, 
    {$push: {ratings: {
      user: userId,
      username: username,
      rating_value: rating, 
      rating_description: comment
    }}}
  )
  .then(response => {
  let total = 0;
  let reduced = response.ratings.map(rating => total += rating.rating_value)
  let avg = Number(total / response.ratings.length);
    Vendor.findByIdAndUpdate(response._id, {avg_rating: avg})
    .then(updatedVendor => {
      res.status(200).json(updatedVendor)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: `Error while editing file` })
    })
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ message: `Error while editing file` })
  })
})

router.put('/:vendorId', (req, res, next) => {
  const {
    email,
    username,
    first_name,
    last_name,
    business_name,
    street,
    house_number,
    additional_address_info,
    postal_code,
    city,
    business_type,
    specialization,
  } = req.body;
  User.findOneAndUpdate(
    { vendor_id: req.params.vendorId },
    {
      full_name: { first_name, last_name },
      contact: { email },
      username,
    },
    { new: true }
  )
    .then((editedUser) => {
      Vendor.findByIdAndUpdate(
        req.params.vendorId,
        {
          business_name,
          address: {
            street,
            house_number,
            additional_info: additional_address_info,
            postal_code,
            city,
          },
          business_type,
          specialization: specialization,
        },
        { new: true }
      )
        .then((editedVendor) => {
          res
            .status(200)
            .json({
              message: "Die ??nderungen wurden erfolgreich gespeichert.",
            });
        })
        .catch((err) => {
          res.status(404).json({
            message: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
      });
    });
});

router.post(
  "/:vendorId/addService",
  uploader.single("imgUrl"),
  (req, res, next) => {
    const {
      name,
      price,
      format,
      street,
      house_number,
      postal_code,
      city,
      operator_name,
      languages,
      description,
      group_size,
      start_time,
      end_time,
      final_dates
    } = req.body;
    console.log("LANGUAGES", languages.split(","));
    Service.create({
      service_avatar: { imgUrl: req.file.path },
      name: name,
      price: price,
      format: format,
      location: { street, house_number, postal_code, city },
      operator: { name: operator_name },
      languages: languages.split(","),
      description: description,
      final_dates: final_dates.split(","),
      time: {start: start_time, end: end_time},
      group_size: { total: group_size },
      vendor_id: req.params.vendorId,
    })
    .then(createdService => {
      console.log("THIS IS THE CREATED SERVICE", createdService)
      Vendor.findByIdAndUpdate(req.params.vendorId, {
          $push: {services: createdService._id}
        }, {
          new: true
        })
        .then(() => {
          console.log(resp)
          res.status(200).json({
            message: 'A service has been successfully created.'
          });
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
  
})

// Find all the services created by the Vendor
router.get("/:vendorId/services", (req, res, next) => {
  Service.find({ vendor_id: req.params.vendorId })
    .then((vendorServices) => {
      console.log(
        "These are the services created by the Vendor: ",
        vendorServices
      );
      res.status(200).json(vendorServices);
    })
    .catch((err) => res.json(err));
});

router.get("/:vendorId/:serviceId", (req, res, next) => {
  Service.findById(req.params.serviceId)
    .then((serviceFromDB) => {
      console.log(serviceFromDB);
      res.status(200).json(serviceFromDB);
    })
    .catch((err) => res.json(err));
});

router.put("/:vendorId/:serviceId", uploader.single("imgUrl"), (req, res, next) => {
  // console.log(req.body, req.file, "THIS IS BODY")
  const {
    name,
    price,
    format,
    street,
    house_number,
    postal_code,
    city,
    operator_name,
    languages,
    description,
    group_size,
    start_time,
    end_time,
    final_dates,
  } = req.body;
  Service.findByIdAndUpdate(
    req.params.serviceId,
    {
      service_avatar: { imgUrl: req.file.path },
      name: name,
      price: price,
      format: format,
      location: { street, house_number, postal_code, city },
      operator: { name: operator_name },
      languages: languages.split(','),
      description: description,
      group_size: { total: group_size },
      final_dates: final_dates.split(","),
      time: {start: start_time, end: end_time},
    },
    { new: true }
  )
  .then(serviceUpdated => {
    console.log(serviceUpdated, "THIS IS SERVICE UPDATED")
    res.status(200).json(serviceUpdated);
  })
  .catch(err => res.json(err));
});

router.delete("/:vendorId/:serviceId", (req, res) => {
  Service.findByIdAndDelete(req.params.serviceId).then(() => {
    res.status(200).json({ message: "This service has been deleted" });
  });
});

module.exports = router;
