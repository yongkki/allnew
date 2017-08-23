module.exports = function(sequelize, DataTypes){
  var StoryImage = sequelize.define('StoryImage',{
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    image : {
      type : DataTypes.STRING
    },
    sequence : {
      type : DataTypes.INTEGER
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
  return StoryImage;
};
