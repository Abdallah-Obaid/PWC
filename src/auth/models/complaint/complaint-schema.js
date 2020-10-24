'use strict';

const mongoose = require('mongoose');
/**
 * @module complaint-schema 
 */

/**
  *@property {String} username required
  *@property {String} email  required
  *@property {String} status 
  *@property {String} subject
  *@property {String} content
  */
const complaint = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  subject: { type: String },
  content: { type: String },

});

module.exports = mongoose.model('complaint', complaint);
