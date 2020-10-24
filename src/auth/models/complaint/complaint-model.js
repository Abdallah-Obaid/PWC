'use strict';
/**
 * @module complaint model
 */
const Model = require('../model');
const schema = require('./complaint-schema');

class Complaint extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = new Complaint(schema);

