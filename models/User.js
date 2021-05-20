const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    // required: true,
    minLength: 2,
    maxLength: 30,
    trim: true
  },
  password: {
    type: String,
    // required: true,
    minLength: 8,
    trim: true
  },
  full_name: {
    first_name: {
      type: String,
      trim: true,
      // required: true
    },
    last_name: {
      type: String,
      trim: true,
      // required: true
    }
  },
  contact: {
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true
    },
    phone_number: {
      type: String,
    }
  },
  role: {
    type: String,
    enum: ["admin", "dogOwner", "vendor"],
    default: "dogOwner",
    // required: true
  },
  avatar: {
    original_name: { type: String },
    path: {
      type: String,
      default: "https://res.cloudinary.com/dswmfvjpe/image/upload/v1621530405/placeholder_kl4seo.png"
    },
    cloudinaryId: { type: String },
  },
  favourites: [{
    type: Schema.Types.ObjectId,
    ref: 'Vendor' }
  ],
  // dogs: [
  //   {
  //     name: {
  //       type: String,
  //     },
  //     birthday: {
  //       type: Date,
  //     },
  //     weight: Number,
  //     gender: {
  //       type: String,
  //       enum: ["m", "f"]
  //     },
  //     size: {
  //       type: String,
  //       enum: ["Klein", "Mittel", "Groß"]
  //     },
  //     rescued: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: String,
  //     dog_avatar: {
  //       original_name: { type: String },
  //       path: {
  //         type: String,
  //         // default: <pathToCloudinaryFile>
  //       },
  //       cloudinaryId: { type: String },
  //     }
  //     // diet: String
  //     // breed: String,
  //   }
  // ],
  vendor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
      }],
  // message: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
},
{ timestamps: true },
);

const User = model("User", userSchema);

module.exports = User;
