const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const postSchema = new Schema(
	{
		business_name: {
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

postSchema.statics.getPostDetail = async function(_id) {
	const postDetail = await this.find({ _id })
		.populate({ path: 'region_name', select: 'region_name' })
		.populate({ path: 'tag_list', select: 'tag_name' })
		.populate({ path: 'create_id', select: 'user_name' });

	return postDetail[0];
};

postSchema.statics.createPost = async function(authorObjectId, postForm) {
	const { business_name, region_name, detail_address, tag_list, post_contents, star_rating } = postForm;

	const newPost = await this.create({
		business_name,
		region_name,
		detail_address,
		post_contents,
		star_rating,
		tag_list,
		create_id: authorObjectId,
		update_id: authorObjectId
	});

	return newPost._id;
};

module.exports = mongoose.model('Post', postSchema);
