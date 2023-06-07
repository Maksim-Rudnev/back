const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  News.init({
    userId: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    tags: DataTypes.STRING,
    images: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
