const express = require('express');
require('./db/dbConnection');
const errorMiddleware = require('./middleware/errorMiddleware');
const jwt = require('jsonwebtoken');

//routes
const postRouter = require('./router/postRouter');
const userRouter = require('./router/userRouter');
const favoriteRouter = require('./router/favoriteRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/favorites', favoriteRouter);
//bütün isteklerin başına api koyduk.
//böyle başlayan 'api/users' her şey de userRouter'ı kullan.

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome!',
  });
}); // http://localhost:3000/ yazdığımızda göreceğimiz mesaj.

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('3000 portunda server çalışmaya başladı.');
});
