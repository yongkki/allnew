module.exports = function(sequelize, DataTypes){
  var storyImage = sequelize.define('storyImage',{
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    image : {
      type : DataTypes.STRING
    },
    storyId : {
      type : DataTypes.INTEGER,
      allowNull : false,
      field : "story_id"
    }
  }, {
    underscored: true,
    paranoid: true,
    tableName: "story_image"
  });
  return storyImage;
};
