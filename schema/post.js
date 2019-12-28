'use strict';
module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL
			},
			placeName: {
				allowNull: false,
				type: DataTypes.STRING(50)
			},
			detailAddress: {
				allowNull: false,
				type: DataTypes.STRING(50)
			},
			photoLink: {
				allowNull: false,
				type: DataTypes.STRING(150)
			},
			postContents: {
				allowNull: false,
				type: DataTypes.TEXT
			},
			starRating: {
				allowNull: false,
				type: DataTypes.INTEGER(1)
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
		{ paranoid: true, tableName: 'post' }
	);

	return Post;
};
