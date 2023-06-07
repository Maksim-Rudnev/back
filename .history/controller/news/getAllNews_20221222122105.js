const { News, Users } = require('../../models');
const { OK, INTERNAL_SERVER_ERROR } = require('../../constants/responseStatuses');

module.exports = {
  async getAllNews(req, res) {
    try {
      const posts = await News.findAll({
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['id', 'login', ''],
          },
        ],
      });
      return res.status(OK).send(posts);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
