'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		const hashtagsData = [];

		for (let i = 0; i < 10; i++) {
			let data = {
				tagName: 'testHashtag' + i,
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

			hashtagsData.push(data);
		}

		return queryInterface.bulkInsert('Hashtags', hashtagsData, {});
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
