const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

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
		type: String
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
	favorite_post: [
		{
			type: ObjectId,
			ref: 'Post'
		}
	],
	status_code: {
		type: Number,
		required: true,
		default: 1
	}
});

userSchema.statics.signUp = async function(signUpForm) {
	const { user_name, user_id, hashPassword, auth_provider } = signUpForm;

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

userSchema.statics.getFavoritePosts = async function(authorObjectId) {
	const postList = await this.findOne({ _id: authorObjectId }).select('favorite_post');

	return postList.favorite_post;
};

userSchema.statics.addFavoritePosts = async function(authorObjectId, postId) {
	await this.findOneAndUpdate({ _id: authorObjectId }, { $push: { favorite_post: postId } });
};

userSchema.statics.removeFavoritePosts = async function(authorObjectId, postId) {
	await this.findOneAndUpdate({ _id: authorObjectId }, { $pull: { favorite_post: postId } });
};

module.exports = mongoose.model('User', userSchema);
