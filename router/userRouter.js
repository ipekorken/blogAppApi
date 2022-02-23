const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/userInfo', authMiddleware, userController.getUserInfo);
router.patch('/update', authMiddleware, userController.updateUser);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/deleteOwnAccount', authMiddleware, userController.deleteOwnAccount);

module.exports = router;
