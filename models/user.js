const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.statics.signUp = async function(signUpForm) {
	const { user_id, user_password } = signUpForm;
	const hashPassword = await bcrypt.hash(user_password, 12);

	await this.create({ user_id, user_password: hashPassword, user_auth: 'user', user_score: 0, user_ranking: 0 });
};

userSchema.statics.checkDuplicatedId = async function(user_id) {
	try {
		const user = await this.findOne({ user_id });

		if (user) {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
	}
};

userSchema.statics.getUserInfo = async function(user_id) {
	const user = await this.findOne({ user_id });
	return user;
};

module.exports = mongoose.model('User', userSchema);
