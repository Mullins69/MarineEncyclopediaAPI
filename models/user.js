
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id:{
    type: String
  },
  isadmin:{
    type: Boolean,
    default: false
  }
  ,
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  zipcode:{
    type: String,
    required: true,
  },
  country:{
    type: String,
    required: true,
  }
  ,
  join_date: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
