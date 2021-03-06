'use strict';

const mongoose = require('mongoose');
/**
 * @module admin-schema 
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
const admin = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  position: { type: String, required: true },
  workHours: { type: Number },
  image: { type: String },
  gender: { type: String, default: 'Male' },
  birthday: { type: String },
  bio: { type: String, default: 'Add your bio...' },
  mobile: { type: String, default: '+962' },
  signUpDate: { type: String, default: '03/08/2020' },
});

module.exports = mongoose.model('admin', admin);
