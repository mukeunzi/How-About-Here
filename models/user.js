const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	user_id: {
		type: String,
		required: true,
		unique: true
	},
	user_password: {
		type: String,
		required: true
	},
	user_auth: {
		type: String,
		required: true,
		default: 'user'
	},
	user_score: {
		type: Number,
		required: true,
		default: 0
	},
	user_ranking: {
		type: Number
	}
});

module.exports = mongoose.model('User', userSchema);
