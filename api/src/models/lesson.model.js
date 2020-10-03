const { DataTypes } = require('sequelize');

module.exports = sequelize => {
		const Lesson = sequelize.define('lesson', {
						id: {
								type: DataTypes.INTEGER,
								primaryKey: true,
								autoIncrement: true
						},

						title: {
								type: DataTypes.STRING,
								allowNull: false
						},

						number: {
								type: DataTypes.TINYINT,
								allowNull: false
						}
				},
				{
						indexes: [
								{
										unique: true,
										fields: [
												'courseId',
												'number'
										]
								}
						]
				});

		Lesson.associate = models => {
				const { Course } = models;
				Lesson.belongsTo(Course, {
						foreignKey: 'courseId',
						as: 'course'
				});
		};

		return Lesson;
};