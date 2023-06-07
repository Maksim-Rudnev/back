const { validationResult } = require('express-validator');

const { Users, News } = require('../../models');
const {
  OK,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/responseStatuses');

module.exports = {
  async updateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).send({ message: 'Invalid data', errors });
    }

    try {
      const {
        userId,
        body: {
          login,
        },
        file,
      } = req;

      // const data = login ? { login } : { avatar: file };
      // if (login) {
      //   await Users
      //     .update(data, {
      //       where: {
      //         id: userId,
      //       },
      //     });
      // }

      console.log(login);
      if (login) {
        await Users
          .update({ login }, {
            where: {
              id: userId,
            },
          });
      }
      console.log(file);
      if (file) {
        await Users
          .update({ avatar: file }, {
            where: {
              id: userId,
            },
          });
      }

      const newDataUser = await Users.findOne({
        where: {
          id: userId,
        },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: News,
            as: 'news',
          },
        ],
      });

      return res.status(OK).send(newDataUser);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
