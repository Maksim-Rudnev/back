const { check } = require('express-validator');

module.exports = {
  authValidator: [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 15').isLength({ min: 3, max: 15 }),
  ],
  newsValidator: [
    check('title', 'Title must be longer than 5 and shorter than 20').isLength({ min: 5, max: 20 }),
    check('theme', 'Theme must be longer than 5 and shorter than 20').isLength({ min: 5, max: 20 }),
    check('text', 'Text must be longer than 25 and shorter than 150').isLength({ min: 25, max: 150 }),
  ],
  updateLoginValidator: [
    check('login', 'Login must be shorter than 15').trim().isLength({ max: 15 }),
  ],
};
