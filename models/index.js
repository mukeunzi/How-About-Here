const mongoose = require('mongoose');

const mongoURI =
	process.env.MONGODB_URI || `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
		console.log('Connected to mongodb...');
	} catch (error) {
		console.error('Could not connect to mongodb!!! : ', error);
		return process.exit(1);
	}
};
