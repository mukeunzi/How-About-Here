const express = require('express');
const postController = require('../controllers/post-controller');
const { isLoggedIn } = require('../middlewares/login-auth');
const { awsS3ImageUpload } = require('../utils/aws-s3');

const router = express.Router();

// 게시물 관련
router.get('/', isLoggedIn, postController.getPostFormPage);
router.get('/:post_id', postController.getPostDetailPage);
router.post('/', isLoggedIn, awsS3ImageUpload.single('photo_link'), postController.createPost);
router.delete('/:post_id', isLoggedIn, postController.deletePost);

module.exports = router;
