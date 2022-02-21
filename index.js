const express = require('express');
require('./db/dbConnection');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log('3000 portunda server çalışmaya başladı.');
});
