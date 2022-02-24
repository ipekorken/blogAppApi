const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const postController = require('../controllers/postController');

router.get('/', postController.listAllPosts);
router.post('/sendPost', authMiddleware, postController.sendPost);
router.delete('/:id', [authMiddleware, adminMiddleware], postController.deletePost);
router.patch('/updatePost/:id', authMiddleware, postController.updatePost);
router.patch('/doFavorite/:id', authMiddleware, postController.updatePost);
router.get('/:id', authMiddleware, postController.getPostInfo);
module.exports = router;
