const express = require('express');
const asyncify = require('express-asyncify');
const postController = require('../controllers/post-controller');
const { isLoggedIn, isLoggedInForAjax } = require('../middlewares/login-auth');
const { awsS3ImageUpload } = require('../utils/aws-s3');

const router = asyncify(express.Router());

// 게시물 관련
router.get('/', isLoggedIn, postController.getPostFormPage);
router.get('/:post_id', postController.getPostDetailPage);
router.get('/edit/:post_id', isLoggedIn, postController.getPostEditFormPage);
router.post('/', isLoggedIn, awsS3ImageUpload.single('photo_link'), postController.createPost);
router.patch('/:post_id', isLoggedIn, postController.updatePost);
router.delete('/:post_id', isLoggedIn, postController.deletePost);

// 좋아요
router.patch('/like/:post_id', isLoggedInForAjax, postController.likeEvent);

module.exports = router;
