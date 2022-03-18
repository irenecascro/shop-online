// Fichero encargado de levantar el servidor en función de la app donde gestionamos las rutas

// Conecto con la base de datos
require('../dbConfig');

const app = require('../app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});