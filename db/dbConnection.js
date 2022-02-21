const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/blog_api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('conneted to database'))
  .catch(error => console.log('failed database connection'));
