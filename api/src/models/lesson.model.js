const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db.config.js');

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

    Lesson.belongsTo(Course, {
        through: 'course_lessons',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    });
};

module.exports = Lesson;