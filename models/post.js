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
module.exports = mongoose.model('Post', postSchema);
