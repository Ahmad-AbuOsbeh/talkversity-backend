'use strict';

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ahmad:4OgBwpsLM80vVWDu@cluster0.pc38n.mongodb.net/talkversitydb?retryWrites=true&w=majority';
//import the server
const server = require('./src/server.js');

// use mongoose for MongoDB
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
};

// connect database then Start the server
mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    server.start(process.env.PORT);
  })
  .catch((e) => {
    console.error(e.message);
  });
