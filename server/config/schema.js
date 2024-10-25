const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  aadhar: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: Number, required: true },
  guardian_name: { type: String, required: false },
  guardian_number: { type: Number, required: false },
});

module.exports = {
  user: user,
};
