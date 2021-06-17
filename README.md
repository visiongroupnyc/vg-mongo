# Vision Group MongoDB Driver
Powered by César Casas (https://www.linkedin.com/in/cesarcasas)

This library support Tenants!.

Using by Universal Pattern (https://www.npmjs.com/package/universal-pattern)

# Install
```bash
$ npm install vg-mongo
```
# Debug
```bash
$ DEBUG=universal* node youscript
```
---

# Basic example
```javascript
const vgMongo = require('vg-mongo');

const url = 'mongodb://127.0.0.1:27017';

async function init() {
  console.info('running');
  const db = await vgMongo(url, 'vgmongo-test');
  await db.people.asyncRemoveAll();

  console.info('Dropping `people` collection');
  await db.people.asyncDrop();
  console.info('Creating a new entry into collection people.');

  await db.people.asyncInsert({ name: 'Tito', lastName: 'Mendez' });
  const inserted = await db.people.asyncFindOne({ name: 'Tito' });
  console.info('inserted: ', inserted);
  const tenants = ['market1', 'market2', 'market3'];

  const insertedIntoTenants = tenants.map((tenant) => Promise.all([
    db.people.asyncInsert({ name: 'Cesar', lastName: 'Casas', tenant }, { tenant }),
    db.people.asyncInsert({ name: 'Mauro', lastName: 'Luna', tenant }, { tenant }),
    db.people.asyncInsert({ name: 'Valeria', lastName: 'Delgado', tenant }, { tenant }),
    db.people.asyncInsert({ name: 'Catherin', lastName: 'Torres', tenant }, { tenant }),
    db.people.asyncInsert({ name: 'Gabriel', lastName: 'Casas', tenant }, { tenant }),
  ]));

  await Promise.all(insertedIntoTenants);
  const data = await db.people.asyncFind({ }, { }, { tenant: 'market2' });
  console.info('All data from tenant `market2`: ', data);
  const userCesar = await db.people.asyncFindOne({ name: 'Cesar' }, {}, { tenant: 'market3' });
  console.info('userCesar into tenant `market3`: ', userCesar);
  await db.close();
}

init();


```
