const { pick } = require('lodash');

class AuthController {

    constructor({ authService }) {
        this.authService = authService;

        this.authenticate = this.authenticate.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
    }

    async authenticate(req, res) {
        const { email, password } = req.body;
        const token = await this.authService.authenticate(email, password);

        res.cookie('token', token, { httpOnly: true })
            .status(200)
            .json({ message: `Successfully authenticated user with e-mail: ${email}` });
    }

    async register(req, res) {
        const userDTO = pick(req.body, ['email', 'password']);
        const user = await this.authService.register(userDTO);

        res.status(200).json({
            message: 'New user was successfully registered',
            data: user
        });
    }

    logout(req, res) {
        res.clearCookie('token');
        res.status(200).json({ message: 'Successfully logged out user session.' });
    }
}

module.exports = AuthController;