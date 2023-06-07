const express = require('express');

const { newsValidator } = require('../middleware/validator.middleware');
const { news: { getAllNews, addNews } } = require('../controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { fileMiddleware } = require('../middleware/file.middleware');

const router = express.Router();

router.get('/', getAllNews);
router.post('/', authMiddleware, fileMiddleware, newsValidator, addNews);

module.exports = router;
