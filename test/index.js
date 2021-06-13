const vgMongo = require('../index');

const url = 'mongodb://127.0.0.1:27017';

async function init() {
  console.info('running');
  const db = await vgMongo(url, 'vgmongo-test');
  await db.people.asyncRemoveAll();
  const inserted = await Promise.all([
    db.people.asyncInsert({ name: 'Cesar', lastName: 'Casas' }),
    db.people.asyncInsert({ name: 'Mauro', lastName: 'Luna' }),
    db.people.asyncInsert({ name: 'Valeria', lastName: 'Delgado' }),
    db.people.asyncInsert({ name: 'Catherin', lastName: 'Torres' }),
    db.people.asyncInsert({ name: 'Gabriel', lastName: 'Casas' }),
  ]);

  console.info('Inserted: ', inserted);
  const data = await db.people.asyncFind({ });
  console.info('All data: ', data);
  const userCesar = await db.people.asyncFindOne({ name: 'Cesar' });
  console.info('userCesar: ', userCesar);
  await db.close();
}

init();
