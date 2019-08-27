const express = require('express');
const postController = require('../controllers/post-controller');
const { isLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

router.get('/', isLoggedIn, postController.getPostPage);
router.post('/', postController.createPost);
router.patch('/', postController.updatePost);
router.delete('/', postController.deletePost);

module.exports = router;
