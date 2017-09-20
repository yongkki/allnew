const Story = require('../models').Story;
const StoryImage = require('../models').StoryImage;
const Models = require('../models');
const imagePath = require('../config.json').imagePath;
class StoryService {

  // 사연 등록
  create(storyData, files, memberId) {
    return Models.sequelize.transaction((transaction) => {
      return Story.create({
          title: storyData.title,
          content: storyData.content,
          memberId: memberId
        }, {
          transaction: transaction
        })
        .then((story) => {
          let images = [];
          for (let i in files)
            images.push({
              sequence: i,
              image: imagePath + files[i].filename,
              storyId: story.dataValues.id
            });
          return StoryImage.bulkCreate(images, {
            transaction: transaction
          });
        });
    });

  }
}

module.exports = StoryService;
