const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  streamKey: {
    type: String,
    required: true,
    minlength: 25,
    maxlength: 1024
  }
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    streamKey: Joi.string().min(25).max(1024).required()
  });
  return schema.validate(user);
}

module.exports = { User, validateUser };
