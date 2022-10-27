const blogPostService = require('../services/blogPost.service');
const categoriesService = require('../services/category.service');

const publishPost = async (req, res) => {
  const postData = req.body;
  const existingCategories = await categoriesService.getAllCategories()
  .then((categories) => categories.map((category) => category.dataValues.id));

  if (!postData.title || !postData.content || !postData.categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!postData.categoryIds.every((id) => existingCategories.includes(id))) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  const post = await blogPostService.publishPost(postData, req.userId);
  res.status(201).json(post);
};

const getAllPosts = async (_req, res) => {
  try {
    const posts = await blogPostService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await blogPostService.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' }); 
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  publishPost,
  getPostById,
  getAllPosts,
};