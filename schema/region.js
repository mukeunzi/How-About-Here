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
			statusCode: {
				allowNull: false,
				type: DataTypes.INTEGER(1),
				defaultValue: '1'
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
		{ paranoid: true, tableName: 'region' }
	);

	return Region;
};
