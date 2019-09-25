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
		tag_list: {
			type: [ObjectId],
			required: true,
			ref: 'Tag',
			default: undefined
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

module.exports = mongoose.model('Post', postSchema);
