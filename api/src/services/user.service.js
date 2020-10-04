import models from '../models';

const { User } = models;

class UserService {

		constructor() {
		}

		async getUserByEmail(email) {
				return await User.findOne({
						attributes: { exclude: ['password'] },
						where: { email }
				});
		}

		async isUserExist({ email }) {
				const user = await this.getUserByEmail(email);
				return !!user;
		}
}

export default UserService;