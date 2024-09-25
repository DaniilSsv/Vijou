const mongoose = require('mongoose');
const joiObjectid = require('joi-objectid')(Joi);
const Joi = require('joi');

const keySchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  streamKey: {
    type: String,
    required: true,
    minlength: 25,
    maxlength: 1024
  }
});

const Key = mongoose.model('Key', keySchema);

const validateUser = (key) => {
  const schema = Joi.object({
    User: joiObjectid(Joi).required(),
    streamKey: Joi.string().min(25).max(1024).required()
  });
  return schema.validate(key);
}

module.exports = { Key, validateUser };
