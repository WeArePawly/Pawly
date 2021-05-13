const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 30,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true
  },
  full_name: {
    first_name: {
      type: String,
      trim: true,
      required: true
    },
    last_name: {
      type: String,
      trim: true,
      required: true
    }
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone_number: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ["admin", "dogOwner", "vendor"],
    default: "dogOwner"
  },
  avatar: {
    original_name: { type: String },
    path: {
      type: String,
      // default: <pathToCloudinaryFile>
    },
    cloudinaryId: { type: String },
  },
  favourites: [{
    type: Schema.Types.ObjectId,
    ref: 'Vendor' }
  ],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Service' }
  ],
  dogs: [
    {
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      weight: Number,
      gender: {
        enum: ["m", "f"]
      },
      size: {
        enum: ["Klein", "Mittel", "Groß"]
      },
      rescued: {
        type: Boolean,
        default: false
      },
      description: String,
      dog_avatar: {
        original_name: { type: String },
        path: {
          type: String,
          // default: <pathToCloudinaryFile>
        },
        cloudinaryId: { type: String },
      }
      // diet: String
      // breed: String,
    }
  ],
  vendorId: { 
    type: Schema.Types.ObjectId,
    ref: 'Vendor' },
  // message: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
},
{ timestamps: true },
);

const User = model("User", userSchema);

module.exports = User;
