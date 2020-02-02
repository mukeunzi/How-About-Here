'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		const regionsData = [];

		for (let i = 0; i < 10; i++) {
			let data = {
				regionName: 'testRegion' + i,
				createdAt: new Date()
					.toISOString()
					.replace(/T/, ' ')
					.replace(/\..+/, ''),
				updatedAt: new Date()
					.toISOString()
					.replace(/T/, ' ')
					.replace(/\..+/, ''),
				creator: '00000021',
				modifier: '00000021'
			};

			regionsData.push(data);
		}

		return queryInterface.bulkInsert('Regions', regionsData, {});
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	}
};
