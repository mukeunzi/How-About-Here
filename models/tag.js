const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const tagSchema = new Schema(
	{
		tag_name: {
			type: String,
			required: true
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

module.exports = mongoose.model('Tag', tagSchema);
