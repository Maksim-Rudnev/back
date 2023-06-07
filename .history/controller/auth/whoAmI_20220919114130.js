require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Users } = require('../../models');
const {
  OK,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/responseStatuses');

module.exports = {
  async whoAmI(req, res) {
    try {
      const { userId } = req;
      const authUser = await Users.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] },
      });
      const token = jwt.sign(
        { id: authUser.id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
      );
      return res.status(OK).send({ token, authUser });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
