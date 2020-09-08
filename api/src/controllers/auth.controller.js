const { sign: jwtSign, verify: jwtVerify } = require('jsonwebtoken');
const { ErrorHandler } = require('../utils/error');
const { User } = require('../models');
const { isString, isNil } = require('lodash');
const { isValidEmail } = require('../utils/validation');

class AuthController {

    static async authenticate(req, res, next) {
        const { email, password } = req.body;

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

        res.cookie('token', token, { httpOnly: true })
            .status(200)
            .json({ message: `Successfully authenticated user with e-mail: ${email}` });
    }

    static async register(req, res, next) {
        const { email, password } = req.body;
        const user = new User({ email, password });

        validateUser(user);

        const userExist = await isUserExist(user);
        if (userExist) {
            throw new ErrorHandler(400, `Email ${user.email} already in use`);
        }

        await user.save();
        res.status(200).json({ message: `Successfully registered new user with email: ${email}` });
    }

    static async verify(req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;

        if (!token) {
            throw new ErrorHandler(401, 'Unauthorized: No token provided');
        }

        const decoded = jwtVerify(token, process.env.AUTH_SECRET);
        const user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { email: decoded.email }
        });
        return user;
    }

    static logout(req, res) {
        res.clearCookie('token');
        res.status(200).json({ message: 'Successfully logged out user session.' });
    }
}

const isUserExist = async ({ email }) => {
    const user = await User.findOne({
        where: { email }
    });

    return !!user;
};

const validateUser = user => {
    let { email, password } = user;

    console.log(user);

    // Email
    if (isNil(email)) {
        throw new ErrorHandler(400, 'Email is missed ');
    }

    if (!isValidEmail(email)) {
        throw new ErrorHandler(400, 'Email is not valid');
    }

    // Password
    if (isNil(password)) {
        throw new ErrorHandler(400, 'Password is missed');
    }

    if (!isString(password)) {
        throw new ErrorHandler(400, 'Password can be only be string');
    }

    if (password.length < 4) {
        throw new ErrorHandler(400, 'Password should contain min 4 characters');
    }
};


module.exports = AuthController;