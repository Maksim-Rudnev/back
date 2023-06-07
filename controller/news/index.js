const { getAllNews } = require('./getAllNews');
const { addNews } = require('./addNews');

module.exports = {
  news: {
    getAllNews,
    addNews,
  },
};
