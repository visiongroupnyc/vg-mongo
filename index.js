const {
	MongoClient,
	ObjectId,
	Binary,
	Code,
	DBRef,
	Double,
	Int32,
	Long,
	MaxKey,
	MinKey,
	Timestamp,
	Decimal128,
} = require('mongodb');
const debug = require('debug')('vg-mongo');

const paginate = require('./libs/paginate');

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
				if (prop === 'on' || prop === 'emit') {
					const collection = db.collection(prop);
					return collection.bind(db);
				}

				if (db[prop]) {
					return db[prop];
				}

				if (typeof prop === 'symbol') {
					return db[prop];
				}

				db[prop] = db.collection(prop);
				db[prop].paginate = paginate(db[prop]);
				return db[prop];
			},
		};

		return Proxy.create === undefined ? new Proxy({}, handler) : Proxy.create(handler);
	}
	return db;
};

module.exports.Binary = Binary;
module.exports.Code = Code;
module.exports.ObjectId = ObjectId;
module.exports.DBRef = DBRef;
module.exports.Double = Double;
module.exports.Int32 = Int32;
module.exports.Long = Long;
module.exports.MaxKey = MaxKey;
module.exports.MinKey = MinKey;
module.exports.Symbol = Symbol;
module.exports.Timestamp = Timestamp;
module.exports.Map = Map;
module.exports.Decimal128 = Decimal128;
module.exports.default = module.exports;
