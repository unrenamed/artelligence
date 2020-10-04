import {
		hash,
		compare,
		genSalt
} from 'bcryptjs';
import { DataTypes } from 'sequelize';
import config from '../config/app.config';

const SALT_ROUNDS = 10;

export default sequelize => {
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
		};

		return User;
};