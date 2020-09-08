const config = {};

var userRoles = config.userRoles = {
    GUEST: 1,
    USER: 2,
    ADMIN: 4
};

config.accessLevels = {
    GUEST: userRoles.guest | userRoles.user | userRoles.admin,
    USER: userRoles.user | userRoles.admin,
    ADMIN: userRoles.admin
};

config.skillLevels = {
    BEGINNER: 0,
    AVERAGE: 1,
    SKILLED: 2,
    SPECIALIST: 3,
    EXPERT: 4
};

module.exports = config;