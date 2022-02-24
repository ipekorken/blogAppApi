const Post = require('../models/postModel');
var createError = require('http-errors');

const listAllPosts = async (req, res) => {
  const data = await Post.find({});
  res.json({ data });
};

const sendPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const { error, value } = newPost.joiValidation(req.body);
    if (error) {
      next(createError(400, error));
    } else {
      const result = await newPost.save();
      res.json(result);
    }
  } catch (e) {
    next(e);
  }
};

const getPostInfo = async (req, res, next) => {
  const result = await Post.find({ _id: req.params.id });
  res.json(result);
};

const updatePost = async (req, res, next) => {
  delete req.body.createAt;
  delete req.body.updatedAt;

  const { error, value } = Post.joiValidationForUpdate(req.body);
  if (error) {
    next(createError(400, error));
  } else {
    try {
      const result = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).json({
          message: 'Post güncellenemedi.',
        });
      }
    } catch (e) {
      next(e);
    }
  }
};

const deletePost = async (req, res, next) => {
  try {
    const result = await Post.findByIdAndDelete({
      _id: req.params.id,
    });
    if (result) {
      res.json({
        message: 'Post silindi.',
      });
    } else {
      res.json({
        message: 'Post silinemedi / bulunamadı.',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllPosts,
  sendPost,
  updatePost,
  deletePost,
  getPostInfo,
};
