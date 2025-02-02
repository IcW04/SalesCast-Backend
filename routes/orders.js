var express = require('express');
var router = express.Router();

const sql = require('mssql');
const { getConnection } = require('../database');
const { generateToken, validateToken } = require('../helpers/jwt');
const { validateRequestBody, validateQueryParams } = require('../helpers/request');

router.use(validateToken);

const orders = require('../mock/orders');

const future_orders = require('../mock/future_orders');

// GET all orders

router.get('/', function(req, res, next) {

    return res.success({
      orders: orders.orders
    });
    
});

// GET future predictions on orders

router.get('/predictions', function(req, res, next) {

    return res.success({
        future_orders: future_orders.future_orders
    })

});

module.exports = router;