const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { authenticate } = require('./../middleware/auth');
const Key = require('../models/key');
const User = require('../models/user');

// Route to get stream key
router.get('/stream-key', authenticate, async (req, res) => {
/*
    #swagger.tags = ['Stream']
    #swagger.description = 'Route to get the stream key of the authenticated user'
    #swagger.path = '/stream-key'
    #swagger.method = 'get'
    #swagger.summary = 'Get stream key'
    #swagger.responses[200] = {
      description: 'Successfully retrieved stream key',
      schema: { $ref: '#/definitions/StreamKey' }
    }
    #swagger.responses[403] = {
      description: 'Access denied or invalid token',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: 'Server error',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.send({ streamKey: user.streamKey });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
  
// Create a random key route
router.post('/key', authenticate, async (req, res) => {
/*
  #swagger.tags = ['Key']
  #swagger.description = 'Route to create a new random stream key for the authenticated user'
  #swagger.path = '/key'
  #swagger.method = 'post'
  #swagger.summary = 'Create a random stream key'
  #swagger.responses[201] = {
    description: 'Successfully created stream key',
    schema: { $ref: '#/definitions/StreamKey' }
  }
  #swagger.responses[403] = {
    description: 'Access denied or invalid token',
    schema: { $ref: '#/definitions/Error' }
  }
  #swagger.responses[500] = {
    description: 'Server error',
    schema: { $ref: '#/definitions/Error' }
  }
  */
  try {
    let streamKey;
    let keyExists = true;

    while (keyExists) {
      streamKey = uuidv4();
      keyExists = await Key.exists({ streamKey });
    }

    const newKey = new Key({ User: req.user._id, streamKey });
    await newKey.save();
    res.status(201).send({ streamKey: newKey.streamKey });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
  
// Delete a key route
router.delete('/key/:id', authenticate, async (req, res) => {
/*
  #swagger.tags = ['Key']
  #swagger.description = 'Route to delete an existing stream key'
  #swagger.path = '/key/{id}'
  #swagger.method = 'delete'
  #swagger.summary = 'Delete a stream key'
  #swagger.responses[200] = {
    description: 'Successfully deleted stream key',
  }
  #swagger.responses[403] = {
    description: 'Access denied or invalid token',
    schema: { $ref: '#/definitions/Error' }
  }
  #swagger.responses[404] = {
    description: 'Key not found or not authorized to delete',
    schema: { $ref: '#/definitions/Error' }
  }
  #swagger.responses[500] = {
    description: 'Server error',
    schema: { $ref: '#/definitions/Error' }
  }
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string'
  }
  */
  try {
    const key = await Key.findOneAndDelete({ _id: req.params.id, User: req.user._id });
    if (!key) {
      return res.status(404).send('Key not found or not authorized to delete.');
    }
    res.status(200).send('Key deleted.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;