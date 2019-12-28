'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Hashtag', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(8).UNSIGNED.ZEROFILL
			},
			tagName: {
				allowNull: false,
				type: Sequelize.STRING(20)
			},
			statusCode: {
				allowNull: false,
				type: Sequelize.INTEGER(1),
				defaultValue: '1'
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
		return queryInterface.dropTable('Hashtag');
	}
};
