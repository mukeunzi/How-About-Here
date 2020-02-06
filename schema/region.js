'use strict';
module.exports = (sequelize, DataTypes) => {
	const Region = sequelize.define(
		'Region',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL
			},
			regionName: {
				allowNull: false,
				type: DataTypes.STRING(20)
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{ paranoid: true }
	);

	Region.getRegionListAll = async function(User) {
		const regionList = await this.findAll({
			attributes: ['id', 'regionName', 'createdAt', 'updatedAt', 'deletedAt'],
			include: [
				{ model: User, as: 'Creator', attributes: ['userName'] },
				{ model: User, as: 'Modifier', attributes: ['userName'] }
			],
			order: [['createdAt', 'DESC']],
			paranoid: false
		});

		return regionList;
	};

	Region.createRegion = async function(creator, regionName) {
		const newRegion = await this.create({ regionName, creator, modifier: creator });

		return newRegion;
	};

	Region.deleteRegion = async function(id) {
		await this.destroy({ where: { id } });
	};

	Region.updateModifier = async function(Op, data) {
		const { authorObjectId, region } = data;

		await this.update(
			{ modifier: authorObjectId },
			{ where: { id: region, deletedAt: { [Op.ne]: null } }, paranoid: false }
		);
	};

	return Region;
};
