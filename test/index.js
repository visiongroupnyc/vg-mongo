const vgMongo = require('../index');
const { ObjectId } = require('../index');

const url = 'mongodb://127.0.0.1:27017';

async function init() {
	const db = await vgMongo(url, 'vgmongo');
	const data = await db.people.findOne({});
	console.info('running: ', ObjectId);
	console.info('db: ', db, data);

	await db.people.deleteMany({});

	console.info('Dropping `people` collection');
	// await db.people.drop();

	console.info('Creating a new entry into collection people.');

	await db.people.insertOne({ name: 'Tito', lastName: 'Mendez' });
	const inserted = await db.people.findOne({ name: 'Tito' });
	console.info('inserted: ', inserted);

	const inserted2 = await db.people.insertOne({ name: 'Cesar', lastName: 'Casas' });
	await db.people.insertOne({ name: 'Mauro', lastName: 'Luna' });
	await db.people.insertOne({ name: 'Valeria', lastName: 'Delgado' });
	await db.people.insertOne({ name: 'Catherin', lastName: 'Torres' });
	await db.people.insertOne({ name: 'Gabriel', lastName: 'Casas' });

	console.info('inserted2: ', inserted2);
	// await db.people.findOne({ _id: ObjectId() })
	const dataset = await db.people.find({ }, { }).toArray();
	console.info('All data: ', dataset);

	const total = await db.people.count({});
	console.info(`Total items into collection people: ${total}`);

	await db.close();
}

init();
