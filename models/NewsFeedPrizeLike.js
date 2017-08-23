module.exports = function(sequelize, DataTypes) {
  var NewsFeedPrizeLike = sequelize.define('NewsFeedPrizeLike', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    newsFeedPrizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field : "news_feed_prize_id"
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field : "member_id"
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName: "news_feed_prize_like"
  });
  return NewsFeedPrizeLike;
};
