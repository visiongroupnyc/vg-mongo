const debug = require('debug')('vg-mongo:libs:paginate');

const paginate = (collection) => async (query, fields, options, opts = {}) => {
	debug('paginate called: ', query, fields, options, opts);

	const page = options.page || 1;
	let count = 0;
	let totalPages = 0;
	const defaultLimit = 30;
	const { sort = '_id: 1' } = options;

	count = await collection.countDocuments(query || {});
	totalPages = Math.floor(count / (options.limit || defaultLimit)) + ((count % (options.limit || defaultLimit)) > 0 ? 1 : 0);

	const docs = await collection.find(query, fields, opts)
		.sort(sort)
		.skip((options.limit || defaultLimit) * (page - 1))
		.limit(options.limit || defaultLimit)
		.toArray();

	return {
		docs: [...docs],
		limit: (options.limit || defaultLimit),
		count,
		page,
		totalPages,
	};
};

module.exports = paginate;
