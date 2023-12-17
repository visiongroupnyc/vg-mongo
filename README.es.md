# vg-mongo

## Descripción
**vg-mongo** es un cliente de MongoDB, basado en el paquete mongodb, con soporte para paginación. Ofrece una interfaz simplificada para interactuar con MongoDB, facilitando la implementación de funciones comunes de base de datos.

## Características
- Basado en el paquete oficial de MongoDB para Node.js.
- Soporte integrado para paginación.
- Facilita el acceso a colecciones y operaciones de base de datos.

## Instalación
Para instalar **vg-mongo**, usa npm:
```
npm install vg-mongo
```

## Uso Básico
Para iniciar y utilizar **vg-mongo**:
```javascript
const vgMongo = require('vg-mongo');

// Conexión a la base de datos
const db = await vgMongo('mongodb://localhost:27017', 'miBaseDeDatos', { useNewUrlParser: true, useUnifiedTopology: true });

// Uso de una colección
const miColeccion = db.miColeccion;

// Cerrar la conexión
await db.close();
```

## Uso de la Paginación
La biblioteca **vg-mongo** incluye una función de paginación incorporada:

```javascript
// Uso de la paginación en una colección
const query = {}; // Tu consulta MongoDB aquí
const fields = {}; // Campos específicos que quieres recuperar
const options = {
    limit: 10, // Número de documentos por página
    page: 1, // Número de página actual
    sort: { _id: 1 } // Ordenar por _id de forma ascendente
};

// Obten los documentos con paginación
const resultadosPaginados = await miColeccion.paginate(query, fields, options);

console.log(resultadosPaginados);
```

### Detalles de la Función Paginate
- `query`: Criterios de búsqueda en MongoDB.
- `fields`: Campos a devolver en los documentos.
- `options`: Parámetros de paginación como `limit`, `page`, y `sort`.

## Pruebas
Para ejecutar pruebas:
```
npm test
```

## Contribuciones
Las contribuciones son bienvenidas. Por favor, revisa los [issues abiertos](https://github.com/visiongroupnyc/vg-mongo/issues) para reportar errores o sugerir mejoras.

## Licencia
**vg-mongo** está bajo la licencia ISC.

## Enlaces Relevantes
- [Repositorio GitHub](https://github.com/visiongroupnyc/vg-mongo)
- [Reporte de Bugs](https://github.com/visiongroupnyc/vg-mongo/issues)
- [Página de Inicio](https://github.com/visiongroupnyc/vg-mongo#readme)