require('dotenv').config();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { Users } = require('../../models');
const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/responseStatuses');

module.exports = {
  async signIn(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).send({ message: 'Invalid data', errors });
      }
      const {
        body: { password, email },
      } = req;
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      const isPassValid = await user.comparePassword(password);
      if (!isPassValid) {
        return res.status(BAD_REQUEST).send({ message: 'Invalid password' });
      }
      const authUser = await Users.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] },
      });
      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
      );
      return res.status(CREATED).send({ token, authUser });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
