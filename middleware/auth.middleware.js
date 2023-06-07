require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../constants/responseStatuses');

module.exports = {
  authMiddleware(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(UNAUTHORIZED).send({ message: 'Auth error' });
      }
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = id;
      next();
    } catch (error) {
      return res.status(UNAUTHORIZED).send({ message: 'Auth error' });
    }
  },
};
