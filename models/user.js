const mongoose = require('mongoose');
const validator = require('validator');
const { validationMessages } = require('../config/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: validationMessages.user.email,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    default: 'User',
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
