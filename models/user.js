const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
	user_name: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
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
	auth_provider: {
		type: String,
		required: true
	},
	status_code: {
		type: Number,
		required: true,
		default: 1
	}
});

userSchema.statics.signUp = async function(signUpForm) {
	const { user_name, user_id, user_password, auth_provider } = signUpForm;
	const hashPassword = await bcrypt.hash(user_password, 12);

	await this.create({
		user_name,
		user_id,
		user_password: hashPassword,
		user_auth: 'user',
		auth_provider
	});
};

userSchema.statics.checkDuplicatedId = async function(user_id, auth_provider) {
	const user = await this.findOne({ user_id, auth_provider, status_code: 1 });

	if (user) {
		return true;
	}
	return false;
};

userSchema.statics.checkDuplicatedName = async function(user_name) {
	const user = await this.findOne({ user_name, status_code: 1 });

	if (user) {
		return true;
	}
	return false;
};

userSchema.statics.getUserInfo = async function(user_id) {
	const user = await this.findOne({ user_id, status_code: 1 });
	return user;
};

userSchema.methods.isValidPassword = async function(requestPassword, encryptedPassword) {
	const isValid = await bcrypt.compare(requestPassword, encryptedPassword);
	return isValid;
};

module.exports = mongoose.model('User', userSchema);
