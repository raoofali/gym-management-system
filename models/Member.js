const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  mobileNo: String,
  address: String,
  membership: String,
  profilePic: String,
  joiningDate: String
}, { timestamps: true }); // createdAt & updatedAt automatically added

module.exports = mongoose.model('Member', memberSchema);
