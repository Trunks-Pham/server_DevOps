const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  accountStatus: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' }
});

module.exports = mongoose.model('User', UserSchema);
