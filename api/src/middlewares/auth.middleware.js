const AuthController = require('../controllers/auth.controller');

class AuthMiddleware {

    static async withAuth(req, res, next) {
        try {
            const user = await AuthController.verify(req, res, next);
            if (!!user) {
                req.user = user;
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    static allowOnly(accessLevel) {
        const checkUserRole = (req, res, next) => {
            if (req.user && !(accessLevel & req.user.role)) {
                res.sendStatus(403);
                return;
            }

            next();
        }

        return checkUserRole;
    }
}

module.exports = AuthMiddleware;