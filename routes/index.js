const express = require('express');

const router = express.Router();

const mainRouter = require('./main');
const usersRouter = require('./users');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const postRouter = require('./post');
const commentRouter = require('./comment');

router.use('/', mainRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

module.exports = router;
