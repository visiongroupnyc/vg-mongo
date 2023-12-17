const vgMongo = require('../index');
const { ObjectId } = require('../index');

const url = 'mongodb://127.0.0.1:27017';

async function init() {
	const db = await vgMongo(url, 'vgmongo');
	await db.people.deleteMany({});

	console.info('Dropping `people` collection');
	await db.people.drop();

	console.info('Creating a new entry into collection people.');

	await db.people.insertOne({ name: 'Tito', lastName: 'Mendez' });
	const inserted = await db.people.findOne({ name: 'Tito' });
	console.info('inserted: ', inserted);

	const inserted2 = await db.people.insertOne({ name: 'Cesar', lastName: 'Casas' });
	await db.people.insertOne({ name: 'Mauro', lastName: 'Luna' });
	await db.people.insertOne({ name: 'Valeria', lastName: 'Delgado' });
	await db.people.insertOne({ name: 'Catherin', lastName: 'Torres' });
	await db.people.insertOne({ name: 'Gabriel', lastName: 'Casas' });

	console.info('inserted2: ', inserted2, String(inserted2.insertedId));
	await db.people.findOne({ _id: new ObjectId(String(inserted2.insertedId)) });
	const dataset = await db.people.find({ }, { }).toArray();
	console.info('All data: ', dataset);

	const total = await db.people.count({});
	console.info(`Total items into collection people: ${total}`);

	const result = await db.people.paginate({}, {}, { limit: 2, page: 2 });
	console.info('paginate result: ', result);
	await db.close();
}

init();
