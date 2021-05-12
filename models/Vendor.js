const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
  businessName: String,
  ownerFullName: {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    }
  },
  type: {
    enum: ["Hundeschule", "Salon", "Tierarzt"],
    required: true
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    houseNumber: {
      type: Number,
      required: true,
      trim: true
    },
    postalCode: {
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
    additionalInfo: String
  },
  phoneNumber: {
    type: String,
  },
  services: [
    { type: Schema.Types.ObjectId, ref: 'Service' }
  ],
  employees: [
    { name: String }
  ],
  openingHours: [{
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
  vendorRating: {
    type: Number,
    // reference to service rating
  }
},
{ timestamps: true },
);

const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
