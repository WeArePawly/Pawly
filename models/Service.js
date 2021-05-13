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
    additionalInfo: String
  },
  provider: [
    {name: String}
  ],
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
  date: {
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service_avatar: {
    originalname: { type: String },
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