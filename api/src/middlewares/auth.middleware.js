import { verify as jwtVerify } from 'jsonwebtoken'
import { ErrorHandler } from '../../../common/errors/error'

class AuthMiddleware {

		constructor({ userService }) {
				this.userService = userService;

				this.withAuth = this.withAuth.bind(this);
				this.allowOnly = this.allowOnly.bind(this);
		}

		async withAuth(req, res, next) {
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
								req.user = user;
								next();
						}
				} catch (err) {
						next(err);
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