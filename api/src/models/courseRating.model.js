const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const CourseRating = sequelize.define('courseRating', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        rating: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false
        }
    });

    CourseRating.associate = models => {
        const { Course, User } = models;
        Course.belongsToMany(User, { as: 'userRatings', through: CourseRating });
        User.belongsToMany(Course, { as: 'courseRatings', through: CourseRating });
    };

    return CourseRating;
}