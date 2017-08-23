module.exports = function(sequelize, DataTypes) {
  var NewsFeedImage = sequelize.define('NewsFeedImage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    newsFeedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field : "news_feed_id"
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName: "news_feed_image"
  });
  return NewsFeedImage;
};
