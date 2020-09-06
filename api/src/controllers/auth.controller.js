const { sign: jwtSign, verify: jwtVerify } = require('jsonwebtoken');
const User = require('../models/user.model');

class AuthController {

    static async authenticate(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                sendIncorrectEmailOrPasswordError(res);
                return;
            }

            const { same } = await user.comparePasswords(password);
            if (!same) {
                sendIncorrectEmailOrPasswordError(res);
                return;
            }

            const payload = { email };
            const token = jwtSign(payload, process.env.AUTH_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, { httpOnly: true })
                .status(200)
                .json({ message: `Successfully authenticated user with e-mail: ${email}` });
        } catch (err) {
            sendInternalServerError(res);
        }
    }

    static async register(req, res) {
        const { email, password } = req.body;
        const user = new User({ email, password });

        try {
            const userExist = await isUserExist(user);
            if (userExist) {
                res.status(400).json({ error: `Email ${email} already in use` });
                return;
            }

            await user.save();
            res.status(200).json({ message: `Successfully registered new user with email: ${email}` });
        } catch (err) {
            res.status(500).json({ error: 'Error registering new user. Please, try again!' });
        }
    }

    static async verify(req, res) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;

        if (!token) {
            sendNoTokenProvidedError(res);
            return;
        }

        try {
            const decoded = jwtVerify(token, process.env.AUTH_SECRET);
            const user = await User.findOne({
                attributes: { exclude: ['password'] },
                where: { email: decoded.email }
            });
            return user;
        } catch (err) {
            sendInvalidTokenError(res);
        }
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

const sendInternalServerError = res => {
    res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

const sendIncorrectEmailOrPasswordError = res => {
    res.status(401).json({ error: 'Incorrect email or password' });
};

const sendInvalidTokenError = res => {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
};

const sendNoTokenProvidedError = res => {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
};

module.exports = AuthController;