const express = require('express');
const commentController = require('../controllers/comment-controller');
const { isLoggedInForAjax } = require('../middlewares/login-auth');

const router = express.Router();

router.post('/:post_id', isLoggedInForAjax, commentController.createComment);

module.exports = router;
