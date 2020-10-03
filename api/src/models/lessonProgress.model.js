const { DataTypes } = require('sequelize');

module.exports = sequelize => {
		const LessonProgress = sequelize.define('lessonProgress', {
				id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
				},

				isCompleted: {
						type: DataTypes.BOOLEAN,
						allowNull: false,
						defaultValue: false
				}
		});

		LessonProgress.associate = models => {
				const { Lesson, User } = models;
				Lesson.belongsToMany(User, {
						as: 'userProgresses',
						through: LessonProgress
				});
				User.belongsToMany(Lesson, {
						as: 'lessonProgresses',
						through: LessonProgress
				});
		};

		return LessonProgress;
};