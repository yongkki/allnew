module.exports = function(sequelize, DataTypes) {
  var NewsFeedReply = sequelize.define('NewsFeedReply', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
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
    tableName: "news_feed_reply"
  });
  return NewsFeedReply;
};
