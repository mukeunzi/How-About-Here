'use strict';
module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		'Tag',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL
			},
			tagName: {
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
		{ paranoid: true, tableName: 'tag' }
	);

	return Tag;
};
