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
      allowNull: false
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName: "news_feed_reply"
  });
  return NewsFeedReply;
};
