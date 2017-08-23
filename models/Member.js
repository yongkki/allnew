module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define('Member', {
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
        type : DataTypes.STRING
    },
    socialType : {
      type : DataTypes.STRING,
      field : "social_type",
      allowNull : false
    },
    socialId : {
      type : DataTypes.BIGINT,
      field : "social_id",
      allowNull : false
    },
    fcmToken : {
      type : DataTypes.STRING,
      field : "fcm_token"
    },
    newspeedReplyNotice : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 1,
      field : "newspeed_reply_notice"
    },
    reviewCompleteNotice : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 1,
      field : "review_complete_notice"
    },
    uploadCompleteNotice : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 1,
      field : "upload_complete_notice"
    }
  }, {
    underscored: true,
    paranoid : true,
    tableName : "member"
  });
  return Member;
};
