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

const User = mongoose.model('User', userSchema);

const checkDuplicatedId = async user_id => {
	try {
		const user = await User.findOne({ user_id });
		if (user) {
			return true;
		}
		return false;
	} catch (error) {
		console.log(error);
	}
};

module.exports = { checkDuplicatedId };
