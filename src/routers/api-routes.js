'use strict';

const express = require('express');

// import Interface to contact with DB
const Interface = require('../models/Interface');

// import courses model
const coursesModel = require('../models/coursesSchema');

// create new instance of Interface class
const interfaceDB = new Interface(coursesModel);

// access control list middleware
const permissions = require('../middlewares/acl');

// bearer auth middleware
const bearerAuth = require('../middlewares/bearerAuth');

// use express Router
const router = express.Router();

// user route, get all courses
router.get('/courses', bearerAuth, permissions('read'), getAllCoursesHandler);
router.post('/course', bearerAuth, permissions('create'), handleCreate);
router.put('/course/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/course/:id', bearerAuth, permissions('delete'), handleDelete);

// get all courses handler
async function getAllCoursesHandler(req, res) {
  let allRecords = await interfaceDB.get();
  res.status(200).send(allRecords);
}

// create course handler
async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await interfaceDB.create(obj);
  res.status(201).send(newRecord);
}

// update course handler
async function handleUpdate(req, res) {
  const { id } = req.params;
  const obj = req.body;
  let updatedRecord = await interfaceDB.update(id, obj);
  res.status(200).send(updatedRecord);
}

// delete course handler
async function handleDelete(req, res) {
  const { id } = req.params;
  let deletedRecord = await interfaceDB.delete(id);
  res.status(200).send(deletedRecord);
}

module.exports = router;
