const User = require('../models/userModel');
var createError = require('http-errors');
const bcrypt = require('bcrypt');

const getUserInfo = (req, res) => {
  res.json(req.user);
};

const updateUser = async (req, res, next) => {
  delete req.body.createAt;
  delete req.body.updatedAt;
  if (req.body.hasOwnProperty('password')) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const { error, value } = User.joiValidationForUpdate(req.body);
  if (error) {
    next(createError(400, error));
  } else {
    try {
      const result = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).json({
          message: 'User güncellenemedi.',
        });
      }
    } catch (e) {
      next(e);
    }
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const { error, value } = newUser.joiValidation(req.body);
    if (error) {
      next(createError(400, error));
    } else {
      const result = await newUser.save();
      res.json(result);
    }
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.beLogin(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

const deleteOwnAccount = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete({
      _id: req.user._id,
    });
    if (result) {
      res.json({
        message: 'Hesabınız silindi.',
      });
    } else {
      res.json({
        message: 'Hesabınız silinemedi / bulunamadı.',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserInfo,
  updateUser,
  register,
  login,
  deleteOwnAccount,
};
