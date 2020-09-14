const { User } = require('../models');

class UserService {

    constructor() { }

    async getUserByEmail(email) {
        return await User.findOne({
            attributes: { exclude: ['password'] },
            where: { email }
        });
    }

    async isUserExist({ email }) {
        return !!this.getUserByEmail(email);
    }
}

module.exports = UserService;