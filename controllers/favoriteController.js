const Favorite = require('../models/favoriteModel');
var createError = require('http-errors');

const listAllFavorites = async (req, res) => {
  const data = await Favorite.find({});
  res.json({ data });
};

const doFavorite = async (req, res, next) => {
  try {
    const newFavorite = new Favorite(req.body);
    const { error, value } = newFavorite.joiValidation(req.body);
    if (error) {
      next(createError(400, error));
    } else {
      const result = await newFavorite.save();
      res.json(result);
    }
  } catch (e) {
    next(e);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const result = await Post.findByIdAndDelete({
      _id: req.params.id,
    });
    if (result) {
      res.json({
        message: 'Post, favorilerden kaldırıldı',
      });
    } else {
      res.json({
        message: 'Post, favorilerden kaldırılamadı.',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllFavorites,
  doFavorite,
  removeFavorite,
};
