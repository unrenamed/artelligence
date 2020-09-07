const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db.config.js');

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

module.exports = Course;