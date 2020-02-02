'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		const usersData = [];

		for (let i = 0; i < 10; i++) {
			let data = {
				userId: 'testId' + i,
				userPassword: 'testPassword' + i,
				userName: 'testName' + i,
				authProvider: 'local',
				createdAt: new Date()
					.toISOString()
					.replace(/T/, ' ')
					.replace(/\..+/, ''),
				updatedAt: new Date()
					.toISOString()
					.replace(/T/, ' ')
					.replace(/\..+/, '')
			};

			usersData.push(data);
		}

		return queryInterface.bulkInsert('Users', usersData, {});
	},

	down: (queryInterface, Sequelize) => {}
};
