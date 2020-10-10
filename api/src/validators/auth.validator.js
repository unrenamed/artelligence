import {
		isNil,
		isString
} from 'lodash';
import { ErrorHandler } from '../../../common/errors/error';
import { isValidEmail } from '../../../common/utils/validation';

class AuthValidator {

		validateUser(user) {
				let { email, password } = user;

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
		}
}

export default AuthValidator;