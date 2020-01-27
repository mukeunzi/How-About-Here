'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL
			},
			userId: {
				allowNull: false,
				type: DataTypes.STRING(30)
			},
			userPassword: {
				allowNull: false,
				type: DataTypes.STRING(100)
			},
			userName: {
				allowNull: false,
				type: DataTypes.STRING(20)
			},
			userAuth: {
				allowNull: false,
				type: DataTypes.STRING(15),
				defaultValue: 'user'
			},
			authProvider: {
				allowNull: false,
				type: DataTypes.STRING(15)
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

	return User;
};
