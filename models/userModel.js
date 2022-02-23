const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
var createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'Users', timestamps: true }
);
const schema = Joi.object({
  name: Joi.string().min(3).max(50).trim(),
  surname: Joi.string().min(2).max(50).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().trim().min(6),
});

UserSchema.methods.generateToken = async function () {
  const loggedUser = this;
  const token = jwt.sign({ _id: loggedUser._id, email: loggedUser.email }, 'secretkey', {
    expiresIn: '1h',
  });
  return token;
};

UserSchema.methods.joiValidation = function (userObject) {
  schema.required();
  return schema.validate(userObject);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  //delete user._id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  delete user.password;
  return user;
};

UserSchema.statics.beLogin = async (email, password) => {
  const { error, value } = schema.validate({ email, password });
  if (error) {
    throw createError(400, error);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, 'Email ya da şifre hatalı!');
  }
  const pswCheck = await bcrypt.compare(password, user.password);

  if (!pswCheck) {
    throw createError(400, 'Email ya da şifre hatalı!');
  }

  return user;
};

UserSchema.statics.joiValidationForUpdate = function (userObject) {
  return schema.validate(userObject);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
