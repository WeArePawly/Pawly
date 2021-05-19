const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
    name: {
      type: String,
      // required: true
    },
    status: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      // required: true
    },
    format: {
      type: String,
      enum: ["online", "onsite", "mobile"],
      default: "onsite",
      // required: true
    },
    location: {
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
    operator: [
      {
        name: String,
      },
    ],
    languages: [
      {
        type: String,
        enum: ["Deutsch", "Englisch"],
        default: "Deutsch",
      },
    ],
    description: {
      type: String,
      minLength: 50,
      maxLength: 500,
    },
    group_size: {
      total: {
        type: Number,
        default: 1,
      },
      available: Number,
    },
    time: String,
    final_dates: [String],
    booking: [
      {
        booked_dates: String,
        group_size: {
          total: Number,
          available: Number,
        },
        booked_by: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
    service_avatar: {
      original_name: { type: String },
      imgUrl: {
        type: String,
        // default: <pathToCloudinaryFile>
      },
      cloudinaryId: { type: String },
    },
  },
  { timestamps: true }
);

const Service = model("Service", serviceSchema);

module.exports = Service;
