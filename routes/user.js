const express = require('express');

const {
  user: {
    getUser,
    updateUser,
  },
} = require('../controller');
const { fileMiddleware } = require('../middleware/file.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');
const { updateLoginValidator } = require('../middleware/validator.middleware');

const router = express.Router();

router.get('/:id', getUser);
router.patch('/', authMiddleware, fileMiddleware, updateLoginValidator, updateUser);

module.exports = router;
