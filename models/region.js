const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema;

const regionSchema = new Schema({
	region_name: {
		type: String,
		required: true
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

regionSchema.statics.createRegion = async function(authorObjectId, regionName) {
	const newRegion = await this.create({
		region_name: regionName,
		create_id: authorObjectId,
		update_id: authorObjectId
	});

	return newRegion;
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

regionSchema.statics.deleteRegion = async function(authorObjectId, regionForm) {
	const { _id, status_code } = regionForm;

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

regionSchema.statics.getRegionListAll = async function() {
	const regionListAll = await this.find();

	return regionListAll;
};

module.exports = mongoose.model('Region', regionSchema);
