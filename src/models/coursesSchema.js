'use strict';

const mongoose = require('mongoose');

// create the schema
const coursesSchema = mongoose.Schema({
  course_name: { type: String, required: true },
  lecture_days: { type: Array, required: true },
  lecutres_place: { type: String, required: true },
  price: { type: Number, required: true },
});

// create new model
const coursesModel = mongoose.model('courses', coursesSchema);

module.exports = coursesModel;
