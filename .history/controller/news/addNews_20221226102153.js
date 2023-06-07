require('dotenv').config();
const { validationResult } = require('express-validator');

const { News } = require('../../models');
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require('../../constants/responseStatuses');

module.exports = {
  async addNews(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).send({ message: 'Invalid data', errors });
      }
      const {
        userId,
        body: {
          title,
          theme,
          text,
          tags,
        },
        file,
      } = req;
      console.log();
      const newsPost = await News.create({
        userId,
        title,
        theme,
        text,
        tags,
        images: file,
      });

      return res.status(CREATED).send(newsPost);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
