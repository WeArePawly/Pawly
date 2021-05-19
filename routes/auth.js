const router = require("express").Router();
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/signup", (req, res, next) => {
  console.log("this is the signup request:", req.body);
  // get username and password
  const {
    email,
    password,
    role,
    first_name,
    last_name,
    username,
    business_name,
    street,
    house_number,
    additional_address_info,
    postal_code,
    city,
    business_type,
    // dogName,
    // dogBirthday,
    // dogSize,
    // dogGender,
  } = req.body;
  // is the password at least 8 chars
  if (password.length < 8) {
    // if not we show the signup form again with a message
    return res
      .status(400)
      .json({ message: "Your password has to be 8 chars min" });
  }
  if (username === "") {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }
  // validation passed - password is long enough and the username is not empty
  // check if the username already exists
  User.findOne({ $or: [{ contact: { email: email } }, { username: username }] })
    .then((userFromDB) => {
      // if user exists -> we render signup again
      if (userFromDB !== null) {
        let error = "";
        if (
          userFromDB.username === username &&
          userFromDB.contact.email === email
        ) {
          error = "username and email";
        } else if (userFromDB.username === username) {
          error = "username";
        } else if (userFromDB.contact.email === email) {
          error = "email";
        }
        return res
          .status(400)
          .json({ message: `This ${error} already exists.` });
      } else {
        // the username is available
        // we create the hashed password
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        // create the user in the database
        User.create({
          username: username,
          password: hash,
          full_name: { first_name, last_name },
          contact: { email },
          role,
          // dogs: {
          //   name: dogName,
          //   birthday: dogBirthday,
          //   size: dogSize,
          //   gender: dogGender,
          // }
        })
          .then((createdUser) => {
            if (createdUser.role === "vendor") {
              const userId = createdUser._id;
              Vendor.create({
                business_name,
                address: {
                  street,
                  house_number,
                  additional_info: additional_address_info,
                  postal_code,
                  city,
                },
                business_type,
              }).then((createdVendor) => {
                // console.log(userId, createdVendor);
                User.findByIdAndUpdate(
                  userId,
                  {
                    vendor_id: createdVendor._id,
                  },
                  { new: true }
                ).then((updatedUser) => {
                  // log the user in immediately
                  req.login(updatedUser, (err) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ message: "Error while attempting to login" });
                    } else {
                      return res.status(200).json(updatedUser);
                    }
                  });
                });
              });
            }
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Error while logging in" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error while logging in" });
      }
      return res.status(200).json(user);
    });
  })(req, res);
});

// this checks if we have a logged in user -> returns this user as json or null
router.get("/loggedin", (req, res) => {
  console.log("this is the user from the session: ", req.user);
  res.json(req.user);
});

router.delete("/logout", (req, res) => {
  // req.session.destroy() if you are not using passport
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: "Successful Logout" });
});

router.post("/password", (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (oldPassword === newPassword) {
    return res
      .status(400)
      .json({ message: "Old and new password can not be the same." });
  } else {
    // this is not checking yet if the current password is correct
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(newPassword, salt);
    User.findOneAndUpdate({ username: req.user.username }, { password: hash })
      .then(() =>
        res.status(200).json({ message: "Password was successfully changed." })
      )
      .catch((err) => {
        res.status(500).json({ message: "Error while changing password" });
      });
  }
});
module.exports = router;
