# vg-mongo

## Description
**vg-mongo** is a MongoDB client, based on the mongodb package, with pagination support. It offers a simplified interface for interacting with MongoDB, facilitating the implementation of common database functions.

## Features
- Based on the official MongoDB package for Node.js.
- Integrated support for pagination.
- Facilitates access to collections and database operations.

## Installation
To install **vg-mongo**, use npm:
```
npm install vg-mongo
```

## Basic Usage
To start and use **vg-mongo**:
```javascript
const vgMongo = require('vg-mongo');

// Database connection
const db = await vgMongo('mongodb://localhost:27017', 'myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Using a collection
const myCollection = db.myCollection;

// Closing the connection
await db.close();
```

## Pagination Usage
The **vg-mongo** library includes an incorporated pagination function:

```javascript
// Using pagination in a collection
const query = {}; // Your MongoDB query here
const fields = {}; // Specific fields you want to retrieve
const options = {
    limit: 10, // Number of documents per page
    page: 1, // Current page number
    sort: { _id: 1 } // Sort by _id in ascending order
};

// Get the paginated documents
const paginatedResults = await myCollection.paginate(query, fields, options);

console.log(paginatedResults);
```

### Details of the Paginate Function
- `query`: Search criteria in MongoDB.
- `fields`: Fields to return in the documents.
- `options`: Pagination parameters such as `limit`, `page`, and `sort`.

## Tests
To run tests:
```
npm test
```

## Contributions
Contributions are welcome. Please check the [open issues](https://github.com/visiongroupnyc/vg-mongo/issues) for reporting bugs or suggesting improvements.

## License
**vg-mongo** is under the ISC license.

## Relevant Links
- [GitHub Repository](https://github.com/visiongroupnyc/vg-mongo)
- [Bug Report](https://github.com/visiongroupnyc/vg-mongo/issues)
- [Homepage](https://github.com/visiongroupnyc/vg-mongo#readme)

