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

app.get('/', function(req, res) {
    return res.success();
})

module.exports = app;