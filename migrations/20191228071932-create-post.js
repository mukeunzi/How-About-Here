'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Post', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(8).UNSIGNED.ZEROFILL
			},
			placeName: {
				allowNull: false,
				type: Sequelize.STRING(50)
			},
			detailAddress: {
				allowNull: false,
				type: Sequelize.STRING(50)
			},
			photoLink: {
				allowNull: false,
				type: Sequelize.STRING(150)
			},
			postContents: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			starRating: {
				allowNull: false,
				type: Sequelize.INTEGER(1)
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
		return queryInterface.dropTable('Post');
	}
};
