const config = {};

const userRoles = config.userRoles = {
		GUEST: 1,
		USER: 2,
		ADMIN: 4
};

config.accessLevels = {
		GUEST: userRoles.GUEST | userRoles.USER | userRoles.ADMIN,
		USER: userRoles.USER | userRoles.ADMIN,
		ADMIN: userRoles.ADMIN
};

config.skillLevels = {
		BEGINNER: 0,
		AVERAGE: 1,
		SKILLED: 2,
		SPECIALIST: 3,
		EXPERT: 4
};

module.exports = config;