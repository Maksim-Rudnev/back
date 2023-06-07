require('dotenv').config();
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const { Users } = require('../../models');
const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/responseStatuses');

module.exports = {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).send({ message: 'Invalid data', errors });
      }
      const {
        body: {
          login, password, email, avatar,
        },
      } = req;
      const candidate = await Users.findOne({
        where: { [Op.or]: [{ login }, { email }] },
      });
      if (candidate) {
        return res.status(BAD_REQUEST).send({
          message: `User with email ${email} or login ${login} already exits`,
        });
      }
      if (avatar) avatar = '/images/avatar/main_green.png'
      await Users.create({
        login,
        password,
        email,
        avatar,
      });
      return res.status(CREATED).send({ message: 'User was created' });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
