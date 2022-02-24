const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'Posts', timestamps: true }
);
const schema = Joi.object({
  title: Joi.string().min(3).max(50).trim(),
  description: Joi.string().min(2).trim(),
  image: Joi.string().trim(),
  isFavorite: Joi.boolean(),
});

//yeni bir post için:
PostSchema.methods.joiValidation = function (postObject) {
  schema.required();
  return schema.validate(postObject);
};

PostSchema.methods.toJSON = function () {
  const post = this.toObject();
  //delete user._id;
  delete post.createdAt;
  delete post.updatedAt;
  delete post.__v;
  return post;
};

PostSchema.statics.joiValidationForUpdate = function (postObject) {
  return schema.validate(postObject);
  //required kullanamayız çünkü her zaman name, surname, email ve passwordü birlikte güncellemeyebiliriz. Sadece name güncellemeye çalıştığımızda diğerlerinde required yazarsa hata alırız.
};

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
