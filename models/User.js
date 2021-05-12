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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    enum: ["admin", "dogOwner", "vendor"],
    default: "dogOwner"
  },
  avatar: {
    type: String,
    // default: 
  },
  // if dog owner
  // fullName: {
  // },
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }
  ],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Service' }
  ],
  // message: [],
  dogs: [
    {
      name: String,
      age: Number,
      weight: Number,
      size: {
        enum: ["Klein", "Mittel", "Groß"]
      },
      rescued: Boolean,
      avatar: String,
      description: String,
      // diet: String
      // breed: String,
    }
  ],
  // if vendor
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' }
},
{ timestamps: true },
);

const User = model("User", userSchema);

module.exports = User;
