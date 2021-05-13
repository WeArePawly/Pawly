const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
  business_name: String,
  type: {
    enum: ["Hundeschule", "Salon", "Tierarzt"],
    required: true
  },
  addresses: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    house_number: {
      type: Number,
      required: true,
      trim: true
    },
    postal_code: {
      type: Number,
      required: true,
      minLength: 5,
      maxLength: 5
    },
    city: {
      type: Number,
      required: true,
      trim: true
    },
    additional_info: String
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }],
  employees: [
    { name: String }
  ],
  opening_hours: [{
    day: Date, //mon - sun
    periods: [{
      start: Date,
      end: Date
    }]
  }],
  description: {
    type: String,
    minLength: 100,
    maxLength: 1000
  },
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      rating_value: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      rating_description: {
        type: String,
        minLength: 20,
        maxLength: 500
      }
    },
  ],
  avg_rating: {
    type: Number,
    default: 0,
  },
},
{ timestamps: true },
);

const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
