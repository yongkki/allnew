module.exports = function(sequelize, DataTypes) {
  var NewsFeed = sequelize.define('NewsFeed', {
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
    memberId : {
      type : DataTypes.INTEGER,
      field : "member_id",
      allowNull: false
    },
    likeCount : {
      type : DataTypes.INTEGER,
      field : "like_count",
      defaultValue : 0,
      allowNull: false
    },
    replyCount : {
      type : DataTypes.INTEGER,
      field : "reply_count",
      defaultValue : 0,
      allowNull: false
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName : "news_feed"
  });
  return NewsFeed;
};
