// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = 'mongodb://localhost/pawly';

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: DB_URL
    })
  })
)

const User = require('./models/User');
const Vendor = require('./models/Vendor')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user._id);
})

// this is used to retrieve the user by it's id (that is stored in the session)
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(dbUser => {
      done(null, dbUser)
    })
    .catch(err => {
      done(err);
    })
})

passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, (email, password, done) => {
    // this logic will be executed when we log in
    User.findOne({ contact: {email: email} })
      .then(userFromDB => {
        console.log(userFromDB)
        if (userFromDB === null) {
          // there is no user with this username
          done(null, false, { message: 'Wrong Credentials' });
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          // the password does not match
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          // everything correct - user should be logged in
          done(null, userFromDB);
        }
      })
      .catch(err => {
        next(err);
      })
  })
)

app.use(passport.initialize());
app.use(passport.session());

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const owners = require("./routes/owners");
app.use("/api/owners", owners);

const vendors = require("./routes/vendors");
app.use("/api/vendors", vendors);

const bookings = require("./routes/bookings");
app.use("/api/bookings", bookings)

// this is for the build
const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
