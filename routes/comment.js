const express = require('express');
const commentController = require('../controllers/comment-controller');
const { isLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

router.post('/:post_id', isLoggedIn, commentController.createComment);

module.exports = router;
