module.exports = function(sequelize, DataTypes) {
  var newsFeed = sequelize.define('newsFeed', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    informant: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName : "news_feed"
  });
  return newsFeed;
};
