const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const postController = require('../controllers/postController');

router.get('/', postController.listAllPosts);
router.post('/sendPost', authMiddleware, postController.sendPost);
router.delete('/:id', [authMiddleware, adminMiddleware], postController.deletePost);
module.exports = router;
