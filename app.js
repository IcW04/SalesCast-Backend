const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var helmet = require('helmet');
const defaultResponses = require('./helpers/responses');

require('dotenv').config();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// Inicializando el servidor de Express
const app = express();

// Configuracion de middlewares y dependencias necesarias
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(cors(corsOptions));
app.use(defaultResponses);

// Routers
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');

// Routing structure
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);


module.exports = app;