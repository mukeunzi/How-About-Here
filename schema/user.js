'use strict';

const bcrypt = require('bcrypt');

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

	User.getUserInfo = async function(userId) {
		const user = await this.findOne({
			where: { userId },
			attributes: ['id', 'userId', 'userName', 'userPassword', 'authProvider', 'userAuth']
		});
		return user;
	};

	User.prototype.isValidPassword = async function(requestPassword) {
		const isValid = await bcrypt.compare(requestPassword, this.userPassword);
		return isValid;
	};

	User.signUp = async function(signUpForm) {
		const { userName, userId, userPassword, authProvider } = signUpForm;

		await this.create({
			userName,
			userId,
			userPassword,
			authProvider
		});
	};

	User.checkDuplicatedId = async function(userId) {
		const user = await this.findOne({ where: { userId }, attributes: ['id'] });

		if (user) {
			return true;
		}
		return false;
	};

	User.checkDuplicatedName = async function(userName) {
		const user = await this.findOne({ where: { userName }, attributes: ['id'] });

		if (user) {
			return true;
		}
		return false;
	};

	return User;
};
