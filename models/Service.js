const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  format: {
    enum: ["online", "single", "group"],
    groupSize: Number,
    required: true
  },
  location: {
    street: {
      type: String,
      trim: true
    },
    houseNumber: {
      type: Number,
      trim: true
    },
    postalCode: {
      type: Number,
      minLength: 5,
      maxLength: 5
    },
    city: {
      type: Number,
      trim: true
    },
    additionalInfo: String
  },
  provider: [{
    // here you should be able to select an employee of the vendor
  }],
  languages: [
    {
      enum: ["Deutsch", "Englisch"]
    }
  ],
  description: {
    type: String,
    minLength: 50,
    maxLength: 500
  },
  date: {
    // time and date
  },
  avatar: {
    type: String,
    // default:
  },

},
{ timestamps: true },
);

const Service = model("Service", serviceSchema);

module.exports = Service;