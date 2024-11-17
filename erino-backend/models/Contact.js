const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true,unique : true },
    company: { type: String },
    jobTitle: { type: String },
  },
  { timestamps: true }  // Add timestamps for createdAt and updatedAt
);

module.exports = mongoose.model("Contact", ContactSchema);
