import {
		isNil,
		isString,
		isEmpty
} from 'lodash';
import { ErrorHandler } from '../../../common/errors/error';
import { isValidEmail } from '../../../common/utils/validation';

class PaymentValidator {

		validateCharge(chargeData) {
				const { amount, source, receipt_email } = chargeData;

				// Amount
				if (isNil(amount)) {
						throw new ErrorHandler(400, 'Charge amount is missed');
				}

				if (!isString(amount)) {
						throw new ErrorHandler(400, 'Charge amount can be only be string');
				}

				if (isEmpty(amount)) {
						throw new ErrorHandler(400, 'Charge amount can not be empty');
				}

				// Source
				if (isNil(source)) {
						throw new ErrorHandler(400, 'Charge source is missed ');
				}

				// Receipt email
				if (isNil(receipt_email)) {
						throw new ErrorHandler(400, 'Charge receipt email is missed ');
				}

				if (!isValidEmail(receipt_email)) {
						throw new ErrorHandler(400, 'Charge receipt email is not valid');
				}
		}
}

export default PaymentValidator;