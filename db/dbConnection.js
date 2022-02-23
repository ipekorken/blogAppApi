const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/blog_api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('veritabanına baglanıldı'))
  .catch(hata => console.log('veritabanı baglantı hatası'));
