const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const publishPost = async (post, user) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const postData = await BlogPost.create({
      title: post.title,
      content: post.content,
      userId: user,
    }, { transaction: t });

    const postsCategories = post.categoryIds.map((category) => ({
      postId: postData.id,
      categoryId: category,
    }));

    await PostCategory.bulkCreate([...postsCategories], { transaction: t });

    return postData;
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { publishPost };