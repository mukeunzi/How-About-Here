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

tagSchema.statics.getTagListAll = async function() {
	const tagListAll = await this.find()
		.populate({ path: 'create_id', select: 'user_name' })
		.populate({ path: 'update_id', select: 'user_name' });

	return tagListAll;
};

tagSchema.statics.createTag = async function(authorObjectId, tagName) {
	const newTag = await this.create({
		tag_name: tagName,
		create_id: authorObjectId,
		update_id: authorObjectId
	});

	return newTag;
};

tagSchema.statics.deleteTag = async function(authorObjectId, _id) {
	await this.updateOne(
		{ _id },
		{
			$set: {
				update_id: authorObjectId,
				status_code: 0
			}
		}
	);
};

module.exports = mongoose.model('Tag', tagSchema);
