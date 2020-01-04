const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const mongodb = require('./models');
const models = require('./schema');
const moment = require('moment');

const { verifyToken } = require('./middlewares/verify-token');
const routers = require('./routes');

mongodb();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

moment.locale('ko');
app.locals.moment = moment;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.COOKIE_SECRET
	})
);
app.use(flash());

app.use(verifyToken);
app.use('/', routers);

app.use(function(req, res, next) {
	next(createError(404));
});

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
