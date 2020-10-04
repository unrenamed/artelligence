import { DataTypes } from 'sequelize';

export default sequelize => {
		const Course = sequelize.define('course', {
				id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
				},

				title: {
						type: DataTypes.STRING,
						allowNull: false
				},

				description: {
						type: DataTypes.TEXT,
						allowNull: false
				},

				level: {
						type: DataTypes.INTEGER
				},

				price: {
						type: DataTypes.DECIMAL(8, 2),
						defaultValue: 0.0,
						allowNull: false
				},

				isPremiumFree: {
						type: DataTypes.BOOLEAN,
						defaultValue: false,
						allowNull: false
				},

				isActive: {
						type: DataTypes.BOOLEAN,
						defaultValue: true,
						allowNull: false
				}
		});

		Course.associate = models => {
				const { Lesson } = models;
				Course.hasMany(Lesson, { as: 'lessons' });
		};

		return Course;
};