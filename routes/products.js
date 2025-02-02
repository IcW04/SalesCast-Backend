var express = require('express');
var router = express.Router();

const sql = require('mssql');
const { getConnection } = require('../database');
const { generateToken, validateToken } = require('../helpers/jwt');
const { validateRequestBody, validateQueryParams } = require('../helpers/request');

router.use(validateToken);

const products = require('../mock/products');

// GET all orders

router.get('/', function(req, res, next) {

    return res.success({
      products: products.products
    })


});

module.exports = router;