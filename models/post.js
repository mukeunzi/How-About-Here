const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const postSchema = new Schema(
	{
		place_name: {
			type: String,
			required: true
		},
		region_name: {
			type: ObjectId,
			required: true,
			ref: 'Region'
		},
		detail_address: {
			type: String
		},
		photo_link: {
			type: String,
			required: true
		},
		post_contents: {
			type: String,
			required: true
		},
		star_rating: {
			type: Number,
			required: true,
			default: 0
		},
		tag_list: [
			{
				type: ObjectId,
				ref: 'Tag',
				default: undefined
			}
		],
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

postSchema.statics.getPostList = async function() {
	const postList = await this.find({ status_code: 1 })
		.populate({ path: 'region_name', select: 'region_name' })
		.populate({ path: 'tag_list', select: 'tag_name' })
		.populate({ path: 'create_id', select: 'user_name' })
		.sort({ create_date: -1 });

	return postList;
};

postSchema.statics.getSearchResult = async function(searchCondition) {
	const postList = await this.find({ status_code: 1 })
		.and(searchCondition)
		.populate({ path: 'region_name', select: 'region_name' })
		.populate({ path: 'tag_list', select: 'tag_name' })
		.populate({ path: 'create_id', select: 'user_name' })
		.sort({ create_date: -1 });

	return postList;
};

postSchema.statics.getPostDetail = async function(_id) {
	const postDetail = await this.findOne({ _id, status_code: 1 })
		.populate({ path: 'region_name', select: 'region_name' })
		.populate({ path: 'tag_list', select: 'tag_name' })
		.populate({ path: 'create_id', select: 'user_name' });

	return postDetail;
};

postSchema.statics.createPost = async function(authorObjectId, postForm) {
	const { place_name, region_name, detail_address, tag_list, photo_link, post_contents, star_rating } = postForm;

	const newPost = await this.create({
		place_name,
		region_name,
		detail_address,
		post_contents,
		star_rating,
		tag_list,
		photo_link,
		create_id: authorObjectId,
		update_id: authorObjectId
	});

	return newPost._id;
};

postSchema.statics.deletePost = async function(authorObjectId, postId) {
	await this.updateOne({ _id: postId }, { $set: { update_id: authorObjectId, status_code: 0 } });
};

postSchema.statics.updatePost = async function(authorObjectId, postForm) {
	const { _id, tag_list, star_rating, post_contents } = postForm;

	await this.updateOne({ _id }, { $set: { update_id: authorObjectId, tag_list, star_rating, post_contents } });
};

module.exports = mongoose.model('Post', postSchema);
