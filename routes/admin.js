const express = require('express');
const postController = require('../controllers/post-controller');
const { isLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

router.get('/post', isLoggedIn, postController.getPostPage);
router.post('/post', postController.createPost);
router.patch('/post', postController.updatePost);
router.delete('/post', postController.deletePost);

router.get('/post/list', isLoggedIn, postController.getPostListAll);

module.exports = router;
