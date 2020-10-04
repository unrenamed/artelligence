import validator from 'email-validator';

export const isValidEmail = email => validator.validate(email);