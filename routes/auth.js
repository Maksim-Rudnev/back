const express = require('express');

const { authValidator } = require('../middleware/validator.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');
const {
  auth: {
    signIn, whoAmI, registration,
  },
} = require('../controller');

const router = express.Router();

router.post('/signin', authValidator, signIn);
router.get('/whoami', authMiddleware, whoAmI);
router.post('/signup', authValidator, registration);

module.exports = router;
