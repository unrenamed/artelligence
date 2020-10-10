export const avg = (values = []) => {
		return values.length ?
				values.reduce((previous, current) => current += previous, 0) / values.length :
				0;
};