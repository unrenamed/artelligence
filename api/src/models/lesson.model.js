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

        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });

    Lesson.associate = models => {
        const { Course } = models;
        Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
    };

    return Lesson;
}