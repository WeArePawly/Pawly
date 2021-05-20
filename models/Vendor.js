const { Schema, model } = require("mongoose");

const vendorSchema = new Schema(
  {
    business_name: {
      type: String,
      required: true,
    },
    business_type: {
      type: String,
      // required: true,
      enum: ["Hundeschule", "Salon", "Tierarzt"],
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
      minLength: 10,
      maxLength: 1000
    },  
    address: {
      street: {
        type: String,
        // required: true,
        trim: true,
      },
      house_number: {
        type: Number,
        // required: true,
        trim: true,
      },
      postal_code: {
        type: Number,
        // required: true,
        minLength: 5,
        maxLength: 5,
      },
      city: {
        type: String,
        // required: true,
        trim: true,
      },
      additional_info: String,
    },
    ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: ‘User’,
      },
      username: {
        type: String
      },
      rating_value: {
        type: Number,
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
    specialization: [
      {
        type: String,
        enum: ["Leinentraining", "Trennungsangst", "Welpenschule", "Agility"],
      },
    ],
  { timestamps: true }
);

const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
