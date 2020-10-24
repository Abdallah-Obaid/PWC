'use strict';

const mongoose = require('mongoose');
/**
 * @module complaint-schema 
 */

/**
  *@property {String} username required
  *@property {String} email  required
  *@property {String} password required
  *@property {String} role required
  *@property {String} position required
  *@property {String} workHours required
  *@property {String} image required
  *@property {String} gender
  *@property {String} birthday
  */
const complaint = mongoose.Schema({
  username : {type: String, required: true},
  email: { type: String, required: true},
  role: {type: String, required: true},
  position: {type: String, required: true},
  status: {type: String},
  subject: {type: String},
  content: {type: String},

});

module.exports = mongoose.model('complaint', complaint);
