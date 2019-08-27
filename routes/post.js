const express = require('express');
const postController = require('../controllers/post-controller');

const router = express.Router();

router.get('/', postController.getPostPage);
router.post('/', postController.createPost);
router.patch('/', postController.updatePost);
router.delete('/', postController.deletePost);

module.exports = router;
