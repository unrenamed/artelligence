const { DataTypes } = require('sequelize');
const { hash, compare, genSalt } = require('bcryptjs');
const sequelize = require('../configs/db.config.js');
const config = require('../configs/app.config');

const SALT_ROUNDS = 10;

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
        defaultValue: config.userRoles.user
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

module.exports = User;