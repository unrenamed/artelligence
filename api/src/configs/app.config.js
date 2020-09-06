const config = {};

var userRoles = config.userRoles = {
    guest: 1,
    user: 2,
    admin: 4
};

config.accessLevels = {
    GUEST: userRoles.guest | userRoles.user | userRoles.admin,
    USER: userRoles.user | userRoles.admin,
    ADMIN: userRoles.admin
};

module.exports = config;