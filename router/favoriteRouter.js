const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const favoriteController = require('../controllers/favoriteController');

router.get('/', authMiddleware, favoriteController.listAllFavorites);
router.delete('/:id', authMiddleware, favoriteController.removeFavorite);
router.post('/doFavorite', authMiddleware, favoriteController.doFavorite);
module.exports = router;
