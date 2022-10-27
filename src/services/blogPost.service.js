const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
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

const getAllPosts = async () => {
  const posts = BlogPost
    .findAll({ include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }] });
  return posts;
};

const getPostById = async (id) => {
  const post = BlogPost.findOne({ where: { id }, 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] });

  return post;
};

const updatePost = async (id, post) => {
  const updatedPost = await BlogPost
    .update({ title: post.title, content: post.content }, { where: { id },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }],
     });

  return updatedPost;
};

const deletePost = async (id) => BlogPost.destroy({ where: { id } });

module.exports = { publishPost, getAllPosts, getPostById, updatePost, deletePost };