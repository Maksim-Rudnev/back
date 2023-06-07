const { News, Users } = require('../../models');

const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/responseStatuses');

module.exports = {
  async getUser(req, res) {
    try {
      const { params: { id } } = req;
      const user = await Users.findOne({
        where: {
          id,
        },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: News,
            as: 'news',
          },
        ],
      });
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      return res.status(OK).send({
        user,
      });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
