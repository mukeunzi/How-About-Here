const express = require('express');
const asyncify = require('express-asyncify');
const commentController = require('../controllers/comment-controller');
const { isLoggedInForAjax } = require('../middlewares/login-auth');

const router = asyncify(express.Router());

router.post('/:post_id', isLoggedInForAjax, commentController.createComment);
router.delete('/:comment_id', isLoggedInForAjax, commentController.deleteComment);

module.exports = router;
