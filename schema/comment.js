'use strict';
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL
			},
			commentBody: {
				allowNull: false,
				type: DataTypes.TEXT
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
		{ paranoid: true, tableName: 'comment' }
	);

	return Comment;
};
