const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const commentSchema = new Schema(
	{
		comment_body: {
			type: String,
			required: true
		},
		post_id: {
			type: ObjectId,
			required: true,
			ref: 'Post'
		},
		create_id: {
			type: ObjectId,
			required: true,
			ref: 'User'
		},
		update_id: {
			type: ObjectId,
			required: true,
			ref: 'User'
		},
		status_code: {
			type: Number,
			required: true,
			default: 1
		}
	},
	{ timestamps: { createdAt: 'create_date', updatedAt: 'update_date' } }
);

commentSchema.statics.createComment = async function(authorObjectId, commentForm) {
	const { comment_body, post_id } = commentForm;

	const newComment = await this.create({
		comment_body,
		post_id,
		create_id: authorObjectId,
		update_id: authorObjectId
	});

	return newComment;
};

commentSchema.statics.getCommentsList = async function(post_id) {
	const commentsList = await this.find({ post_id, status_code: 1 }).populate({
		path: 'create_id',
		select: 'user_name'
	});

	return commentsList;
};

module.exports = mongoose.model('Comment', commentSchema);
