const { Sequelize } = require('sequelize');

const DB_CONFIG = {
		DB: process.env.MYSQL_DATABASE,
		USER: process.env.MYSQL_USER,
		PASSWORD: process.env.MYSQL_PASSWORD,
		HOST: process.env.MYSQL_HOSTNAME,
		dialect: 'mysql',
		pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
		}
};

const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
		host: DB_CONFIG.HOST,
		dialect: DB_CONFIG.dialect,
		operatorsAliases: 0,
		pool: {
				max: DB_CONFIG.pool.max,
				min: DB_CONFIG.pool.min,
				acquire: DB_CONFIG.pool.acquire,
				idle: DB_CONFIG.pool.idle
		}
});

module.exports = sequelize;