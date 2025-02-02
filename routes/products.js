var express = require('express');
var router = express.Router();

const sql = require('mssql');
const { getConnection } = require('../database');
const { generateToken, validateToken } = require('../helpers/jwt');
const { validateRequestBody, validateQueryParams } = require('../helpers/request');

router.use(validateToken);

const products = [{
    "product_id": 1,
    "product_name": "smartphone",
    "product_unit_price": 1000.00,
    "product_status": 1,
    "product_inventory": 362
},
{
    "product_id": 2,
    "product_name": "laptop",
    "product_unit_price": 1250.00,
    "product_status": 1,
    "product_inventory": 799
},
{
    "product_id": 3,
    "product_name": "tablet",
    "product_unit_price": 650.00,
    "product_status": 1,
    "product_inventory": 787
},
{
    "product_id": 4,
    "product_name": "smartwatch",
    "product_unit_price": 375.00,
    "product_status": 1,
    "product_inventory": 741
},
{
    "product_id": 5,
    "product_name": "gaming console",
    "product_unit_price": 450.00,
    "product_status": 1,
    "product_inventory": 655
},
{
    "product_id": 6,
    "product_name": "smart TV",
    "product_unit_price": 1000.00,
    "product_status": 1,
    "product_inventory": 287
},
{
    "product_id": 7,
    "product_name": "virtual reality headset",
    "product_unit_price": 450.00,
    "product_status": 1,
    "product_inventory": 688
},
{
    "product_id": 8,
    "product_name": "smart speaker",
    "product_unit_price": 150.00,
    "product_status": 1,
    "product_inventory": 912
},
{
    "product_id": 9,
    "product_name": "action camera",
    "product_unit_price": 350.00,
    "product_status": 1,
    "product_inventory": 905
},
{
    "product_id": 10,
    "product_name": "drone",
    "product_unit_price": 750.00,
    "product_status": 1,
    "product_inventory": 59
},
{
    "product_id": 11,
    "product_name": "fitness tracker",
    "product_unit_price": 150.00,
    "product_status": 1,
    "product_inventory": 40
},
{
    "product_id": 12,
    "product_name": "e-reader",
    "product_unit_price": 175.00,
    "product_status": 1,
    "product_inventory": 511
},
{
    "product_id": 13,
    "product_name": "portable charger",
    "product_unit_price": 35.00,
    "product_status": 1,
    "product_inventory": 866
},
{
    "product_id": 14,
    "product_name": "wireless earbuds",
    "product_unit_price": 175.00,
    "product_status": 1,
    "product_inventory": 116
},
{
    "product_id": 15,
    "product_name": "robot vacuum",
    "product_unit_price": 350.00,
    "product_status": 1,
    "product_inventory": 667
},
{
    "product_id": 16,
    "product_name": "smart thermostat",
    "product_unit_price": 250.00,
    "product_status": 1,
    "product_inventory": 23
},
{
    "product_id": 17,
    "product_name": "security camera",
    "product_unit_price": 200.00,
    "product_status": 1,
    "product_inventory": 351
},
{
    "product_id": 18,
    "product_name": "smart light bulbs",
    "product_unit_price": 30.00,
    "product_status": 1,
    "product_inventory": 565
},
{
    "product_id": 19,
    "product_name": "video doorbell",
    "product_unit_price": 175.00,
    "product_status": 1,
    "product_inventory": 75
},
{
    "product_id": 20,
    "product_name": "smart lock",
    "product_unit_price": 225.00,
    "product_status": 1,
    "product_inventory": 482
}];

// GET all orders

router.get('/', function(req, res, next) {

    return res.success({
      products 
    })


});

module.exports = router;