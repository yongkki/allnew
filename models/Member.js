module.exports = function(sequelize, DataTypes) {
  var member = sequelize.define('member', {
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    nickname : {
      type : DataTypes.STRING,
      allowNull : false
    },
    profile : {
        type : DataTypes.STRING,
        allowNull : false
    },
    socialType : {
      type : DataTypes.INTEGER,
      field : "social_type"
    },
    socialId : {
      type : DataTypes.INTEGER,
      field : "social_id"
    },
    fcmToken : {
      type : DataTypes.STRING,
      allowNull : false,
      field : "fcm_token"
    },
    newspeedReplyNotice : {
      type : DataTypes.INTEGER,
      allowNull : false,
      field : "newspeed_reply_notice"
    },
    reviewCompleteNotice : {
      type : DataTypes.INTEGER,
      allowNull : false,
      field : "review_complete_notice"
    },
    uploadCompleteNotice : {
      type : DataTypes.INTEGER,
      allowNull : false,
      field : "upload_complete_notice"
    }
  }, {
    underscored: true,
    paranoid : true,
    tableName : "member"
  });
  return member;
};
