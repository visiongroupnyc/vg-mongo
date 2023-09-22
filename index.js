const {
	MongoClient,
	ObjectID,
	Binary,
	Code,
} = require('mongodb');
const debug = require('debug')('vg-mongo');

// const Database = require('./lib/database');

let db = null;
module.exports = async function vgMongo(connString, dbname, options) {
	debug('vgMongo called: ', connString, dbname, options);
	const client = new MongoClient(connString, options);

	await client.connect();
	db = client.db(dbname);
	db.close = async function _close() {
		await client.close();
	};

	if (typeof Proxy !== 'undefined') {
		const handler = {
			get: function _get(obj, prop) {
				console.info('get:: _get: ', obj, prop);
				if (prop === 'on' || prop === 'emit') {
					const collection = db.collection(prop);
					return collection.bind(db);
				}

				if (db[prop]) return db[prop];
				if (typeof prop === 'symbol') return db[prop];

				db[prop] = db.collection(prop);
				return db[prop];
			},
		};

		return Proxy.create === undefined ? new Proxy({}, handler) : Proxy.create(handler);
	}
	return db;
};

// expose bson stuff visible in the shell

module.exports.Binary = Binary;
module.exports.Code = Code;
module.exports.ObjectId = ObjectID;
module.exports.ObjectID = ObjectID;

module.exports.default = module.exports;
