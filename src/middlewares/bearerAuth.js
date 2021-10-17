'use strict';

const User = require('../models/usersModel');

// error handler for invalid token
function errorByAuthentication() {
  next('Invalid Token');
}

// export bearer auth middleware
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      errorByAuthentication();
    }

    const token = req.headers.authorization.split(' ').pop();

    // check the token with the original one by the username & the SECRET
    const validUser = await User.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    errorByAuthentication();
  }
};
