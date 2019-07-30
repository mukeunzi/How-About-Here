const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });
		console.log('Connected to mongodb...');
	} catch (error) {
		console.error('Could not connect to mongodb!!! : ', error);
		return process.exit(1);
	}
};
