const Story = require('../models').Story;
const StoryImage = require('../models').StoryImage;

class StoryService {

  // 사연 등록
  static create(storyData) {
    console.log(storyData);
    return Story.create({
      title: storyData.title,
      content: storyData.content,
      memberId: storyData.memberId
    });
  }

  // 사연 이미지 등록
  static createImages(files, storyId) {
    let images = [];
    for (let i in files)
      images.push({sequence: i, image : files[i].filename, storyId: storyId});
    return StoryImage.bulkCreate(images);
  }
}

module.exports = StoryService;
