module.exports = function(sequelize, DataTypes) {
  var NewsFeedLike = sequelize.define('NewsFeedLike', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    newsFeedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field : "news_feed_id"
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field : "member_id"
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName: "news_feed_like"
  });
  return NewsFeedLike;
};
