import validator from 'email-validator'

export const isValidEmail = email => validator.validate(email)

export const isValidJson = json => {
	try {
		JSON.parse(json)
	} catch (e) {
		return false
	}
	return true
}