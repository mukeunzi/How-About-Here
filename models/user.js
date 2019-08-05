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
	},
	auth_provider: {
		type: String,
		required: true
	}
});

userSchema.statics.signUp = async function(signUpForm) {
	const { user_id, user_password, auth_provider } = signUpForm;
	const hashPassword = await bcrypt.hash(user_password, 12);

	await this.create({
		user_id,
		user_password: hashPassword,
		user_auth: 'user',
		user_score: 0,
		user_ranking: 0,
		auth_provider
	});
};

userSchema.statics.checkDuplicatedId = async function(user_id, auth_provider) {
	try {
		const user = await this.findOne({ user_id, auth_provider });

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

userSchema.methods.isValidPassword = async function(requestPassword, encryptedPassword) {
	const isValid = await bcrypt.compare(requestPassword, encryptedPassword);
	return isValid;
};

module.exports = mongoose.model('User', userSchema);
