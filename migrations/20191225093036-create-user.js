'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('User', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(8).UNSIGNED.ZEROFILL
			},
			userId: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
			userPassword: {
				allowNull: false,
				type: Sequelize.STRING(100)
			},
			userName: {
				allowNull: false,
				type: Sequelize.STRING(20)
			},
			userAuth: {
				allowNull: false,
				type: Sequelize.STRING(15),
				defaultValue: 'user'
			},
			authProvider: {
				allowNull: false,
				type: Sequelize.STRING(15)
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('User');
	}
};
