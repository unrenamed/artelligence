import { verify as jwtVerify } from 'jsonwebtoken'
import { ErrorHandler } from '../../../common/errors/error'

class AuthMiddleware {

		constructor({ userService }) {
				this.userService = userService;
				
				this.withAuth = this.withAuth.bind(this);
				this.allowOnly = this.allowOnly.bind(this);
			  this.ensureLoggedUser = this.ensureLoggedUser.bind(this);
				this.verifyToken = this.verifyToken.bind(this);
		}

		async withAuth(req, res, next) {
				const { user, err } = await this.verifyToken(req);
				if (!err) {
						req.user = user;
						next();
				} else {
					req.user = null;
					next(err);
				}
		}

		async ensureLoggedUser(req, res, next) {
				const { user, err } = await this.verifyToken(req);
				if (!err) {
						req.user = user;
						next();
				} else {
						req.user = null;
				}
		}

		async verifyToken(req) {
				try {
						const token =
							req.body.token ||
							req.query.token ||
							req.headers['x-access-token'] ||
							req.cookies.token;

						if (!token) {
								throw new ErrorHandler(403, 'Unauthorized: No token provided');
						}

						const decoded = jwtVerify(token, process.env.AUTH_SECRET);
						const user = await this.userService.getUserByEmail(decoded.email);

						if (!!user) {
								return { user, error: null };
						}
				} catch (err) {
						return { user: null, error: err };
				}
		}

		allowOnly(accessLevel) {
				const checkUserRole = (req, res, next) => {
						if (req.user && !(accessLevel & req.user.role)) {
								res.sendStatus(403);
								return;
						}

						next();
				};

				return checkUserRole;
		}
}

export default AuthMiddleware;