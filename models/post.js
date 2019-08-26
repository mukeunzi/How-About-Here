const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const postSchema = new Schema({
	post_title: {
		type: String,
		required: true
	},
	first_candidate: {
		type: String,
		required: true
	},
	second_candidate: {
		type: String,
		required: true
	},
	first_counting: {
		type: Number,
		required: true,
		default: 0
	},
	second_counting: {
		type: Number,
		required: true,
		default: 0
	},
	voting_participant: {
		type: Number,
		required: true,
		default: 0
	},
	create_id: {
		type: ObjectId,
		required: true,
		ref: 'User'
	},
	create_date: {
		type: Date,
		required: true,
		default: Date.now
	},
	update_id: {
		type: ObjectId,
		required: true,
		ref: 'User'
	},
	update_date: {
		type: Date,
		required: true,
		default: Date.now
	},
	status_code: {
		type: Number,
		required: true,
		default: 1
	}
});

postSchema.statics.createPost = async function(authorObjectId, postForm) {
	const { post_title, first_candidate, second_candidate } = postForm;

	await this.create({
		post_title,
		first_candidate,
		second_candidate,
		create_id: authorObjectId,
		update_id: authorObjectId
	});
};

postSchema.statics.updatePost = async function(authorObjectId, postForm) {
	const { _id, post_title, first_candidate, second_candidate, status_code } = postForm;

	await this.updateOne(
		{ _id },
		{
			$set: {
				post_title,
				first_candidate,
				second_candidate,
				update_id: authorObjectId,
				update_date: Date.now(),
				status_code
			}
		}
	);
};

postSchema.statics.deletePost = async function(authorObjectId, postForm) {
	const { _id, status_code } = postForm;

	await this.updateOne(
		{ _id },
		{
			$set: {
				update_id: authorObjectId,
				update_date: Date.now(),
				status_code
			}
		}
	);
};

module.exports = mongoose.model('Post', postSchema);
