const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  vendor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  name: {
    type: String,
    // required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    // required: true
  },
  format: {
    enum: ["online", "onsite", "mobile"],
    default: "onsite",
    // required: true
  },
  location: {
    street: {
      type: String,
      // required: true,
      trim: true
    },
    house_number: {
      type: Number,
      // required: true,
      trim: true
    },
    postal_code: {
      type: Number,
      // required: true,
      minLength: 5,
      maxLength: 5
    },
    city: {
      type: Number,
      // required: true,
      trim: true
    },
    additional_info: String
  },
  operator: [{
    name: String
  }],
  languages: [
    {
      enum: ["Deutsch", "Englisch"],
      default: "Deutsch"
    }
  ],
  description: {
    type: String,
    minLength: 50,
    maxLength: 500
  },
  bookings: [{
    dates: [{
      start_date: {
        type: Date,
        // required: true
      },
      end_date: {
        type: Date,
        required: true
      },
    }],
    group_size: {
      total: Number,
      available: Number
    },
    booked_by: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true
    }]
  }],
  service_avatar: {
    original_name: { type: String },
    path: {
      type: String,
      // default: <pathToCloudinaryFile>
    },
    cloudinaryId: { type: String },
  }
},
{ timestamps: true },
);

const Service = model("Service", serviceSchema);

module.exports = Service;