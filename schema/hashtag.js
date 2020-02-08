'use strict';
module.exports = (sequelize, DataTypes) => {
	const Hashtag = sequelize.define(
		'Hashtag',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(8).UNSIGNED.ZEROFILL
			},
			tagName: {
				allowNull: false,
				type: DataTypes.STRING(20)
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

	Hashtag.getTagListAll = async function(User) {
		const hashtagList = await this.findAll({
			attributes: ['id', 'tagName', 'createdAt', 'updatedAt', 'deletedAt'],
			include: [
				{ model: User, as: 'Creator', attributes: ['userName'] },
				{ model: User, as: 'Modifier', attributes: ['userName'] }
			],
			order: [['createdAt', 'DESC']],
			paranoid: false
		});

		return hashtagList;
	};

	Hashtag.createTag = async function(creator, tagName) {
		const newHashtag = await this.create({ tagName, creator, modifier: creator });

		return newHashtag;
	};

	Hashtag.deleteTag = async function(id) {
		await this.destroy({ where: { id } });
	};

	Hashtag.updateModifier = async function(Op, data) {
		const { authorObjectId, tag } = data;

		await this.update(
			{ modifier: authorObjectId },
			{ where: { id: tag, deletedAt: { [Op.ne]: null } }, paranoid: false }
		);
	};

	return Hashtag;
};
