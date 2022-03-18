const express = require('express');
const path = require('path');

const apiRouter = require('./routes/api');
const productsRouter = require('./routes/products');

// Recupero los datos de .env
require('dotenv').config();

// Pruebas sobre modelo Person
// require('./pruebaPeople');

const app = express();

// Configuración template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Definición de rutas
app.use('/api', apiRouter);
app.use('/products', productsRouter);

module.exports = app;