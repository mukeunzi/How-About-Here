const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const regionSchema = new Schema(
	{
		region_name: {
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

regionSchema.statics.getRegionList = async function() {
	const regionList = await this.find({ status_code: 1 }).select('region_name');

	return regionList;
};

regionSchema.statics.getRegionListAll = async function() {
	const regionListAll = await this.find()
		.populate({ path: 'create_id', select: 'user_name' })
		.populate({ path: 'update_id', select: 'user_name' });

	return regionListAll;
};

regionSchema.statics.checkDuplicatedRegion = async function(regionName) {
	const region = await this.findOne({ region_name: regionName, status_code: 1 });

	if (region) {
		return true;
	}
	return false;
};

regionSchema.statics.getRegionInfo = async function(regionName) {
	const region = await this.findOne({ region_name: regionName, status_code: 1 });

	return region._id;
};

regionSchema.statics.createRegion = async function(authorObjectId, regionName) {
	const newRegion = await this.create({
		region_name: regionName,
		create_id: authorObjectId,
		update_id: authorObjectId
	});

	return newRegion._id;
};

regionSchema.statics.updateRegion = async function(authorObjectId, regionForm) {
	const { _id, region_name, status_code } = regionForm;

	await this.updateOne(
		{ _id },
		{
			$set: { region_name, update_id: authorObjectId, update_date: Date.now(), status_code }
		}
	);
};

regionSchema.statics.deleteRegion = async function(authorObjectId, _id) {
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

module.exports = mongoose.model('Region', regionSchema);
