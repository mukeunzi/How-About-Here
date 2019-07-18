const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
	const connect = () => {
		if (process.env.NODE_ENV !== 'production') {
			mongoose.set('debug', true);
		}

		mongoose.connect(
			`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${
				process.env.DB_NAME
			}`,
			{
				useNewUrlParser: true,
				dbName: process.env.DB_COLLECTION
			},
			error => {
				if (error) {
					console.log('몽고디비 연결 오류', error);
				} else {
					console.log('몽고디비 연결 성공');
				}
			}
		);
	};

	connect();

	mongoose.connection.on('error', error => {
		console.error('몽고디비 연결 오류', error);
	});

	mongoose.connection.on('disconnected', () => {
		console.error('몽고디비 연결 끊겼습니다. 연결을 재시도합니다.');
		connect();
	});
};
