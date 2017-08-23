module.exports = function(sequelize, DataTypes) {
  var NewsFeedPrize = sequelize.define('NewsFeedPrize', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: "news_feed_prize"
  });
  return NewsFeedPrize;
};
