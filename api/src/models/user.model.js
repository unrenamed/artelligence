const { hash, compare, genSalt } = require('bcryptjs');
const config = require('../configs/app.config');
const { DataTypes } = require('sequelize');

const SALT_ROUNDS = 10;

module.exports = sequelize => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        role: {
            type: DataTypes.INTEGER,
            defaultValue: config.userRoles.USER
        },

        name: {
            type: DataTypes.STRING
        }
    });

    User.addHook('beforeCreate', async (user, options) => {
        const salt = await genSalt(SALT_ROUNDS);
        const hashedPassword = await hash(user.password, salt);
        user.password = hashedPassword;
    });

    User.prototype.comparePasswords = async function (password) {
        const same = await compare(password, this.password);
        return { same };
    }

    return User;
}