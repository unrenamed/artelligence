const avg = (values = []) => values.reduce((previous, current) => current += previous) / values.length;

module.exports = {
		avg
};