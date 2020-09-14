const { User } = require('../models');
const { ErrorHandler } = require('../utils/error');
const { sign: jwtSign } = require('jsonwebtoken');

class AuthService {

    constructor({ userService, authValidator }) {
        this.userService = userService;
        this.authValidator = authValidator;
    }

    async authenticate(email, password) {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new ErrorHandler(401, 'Incorrect email or password');
        }

        const { same } = await user.comparePasswords(password);
        if (!same) {
            throw new ErrorHandler(401, 'Incorrect email or password');
        }

        const payload = { email };
        const token = jwtSign(payload, process.env.AUTH_SECRET, { expiresIn: '1h' });
        return token;
    }

    async register(userDTO) {
        this.authValidator.validateUser(userDTO);

        const user = new User(userDTO);
        const userExist = await this.userService.isUserExist(user);

        if (userExist) {
            throw new ErrorHandler(400, `Email ${user.email} already in use`);
        }

        await user.save();
    }
}

module.exports = AuthService;