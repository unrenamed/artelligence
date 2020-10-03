const validator = require('email-validator');

const isValidEmail = email => validator.validate(email);

module.exports = {
		isValidEmail
};