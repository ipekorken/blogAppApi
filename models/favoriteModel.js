const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const FavoriteSchema = new Schema(
  {
    user_Id: {
      type: String,
      required: true,
    },
    post_Id: {
      type: String,
      required: true,
      unique: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'Favorites', timestamps: true }
);
const schema = Joi.object({
  user_Id: Joi.string(),
  post_Id: Joi.string(),
  isFavorite: Joi.boolean(),
});

//yeni bir post için:
FavoriteSchema.methods.joiValidation = function (favoriteObject) {
  schema.required();
  return schema.validate(favoriteObject);
};

FavoriteSchema.methods.toJSON = function () {
  const favorite = this.toObject();
  delete favorite.createdAt;
  delete favorite.updatedAt;
  delete favorite.__v;
  return favorite;
};

FavoriteSchema.statics.joiValidationForUpdate = function (favoriteObject) {
  return schema.validate(favoriteObject);
  //required kullanamayız çünkü her zaman name, surname, email ve passwordü birlikte güncellemeyebiliriz. Sadece name güncellemeye çalıştığımızda diğerlerinde required yazarsa hata alırız.
};

const Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorite;
