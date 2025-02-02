var express = require('express');
var router = express.Router();

const sql = require('mssql');
const { getConnection } = require('../database');
const { generateToken, validateToken } = require('../helpers/jwt');
const { validateRequestBody, validateQueryParams } = require('../helpers/request');

router.use(validateToken);

// GET all orders

router.get('/', function(req, res, next) {

    return res.success({
      orders: [
        {
            "order_number": 1,
            "client_id": 1,
            "order_date_placed": "12/03/2020",
            "order_amount": 2070.00,
            "products": [
                {
                    "product_id": 2,
                    "product_name": "laptop",
                    "product_quantity": 1,
                    "product_unit_price": 1250.00
                },
                {
                    "product_id": 13,
                    "product_name": "portable charger",
                    "product_quantity": 2,
                    "product_unit_price": 35.00
                },
                {
                    "product_id": 4,
                    "product_name": "smartwatch",
                    "product_quantity": 2,
                    "product_unit_price": 375.00
                }
            ]
        },
        {
            "order_number": 2,
            "client_id": 1,
            "order_date_placed": "02/05/2020",
            "order_amount": 1600.00,
            "products": [
                {
                    "product_id": 17,
                    "product_name": "security camera",
                    "product_quantity": 2,
                    "product_unit_price": 200.00
                },
                {
                    "product_id": 16,
                    "product_name": "smart thermostat",
                    "product_quantity": 2,
                    "product_unit_price": 250.00
                },
                {
                    "product_id": 12,
                    "product_name": "e-reader",
                    "product_quantity": 4,
                    "product_unit_price": 175.00
                }
            ]
        },
        {
            "order_number": 3,
            "client_id": 1,
            "order_date_placed": "07/10/2020",
            "order_amount": 1700.00,
            "products": [
                {
                    "product_id": 6,
                    "product_name": "smart TV",
                    "product_quantity": 1,
                    "product_unit_price": 1000.00
                },
                {
                    "product_id": 9,
                    "product_name": "action camera",
                    "product_quantity": 2,
                    "product_unit_price": 350.00
                }
            ]
        },
        {
            "order_number": 4,
            "client_id": 2,
            "order_date_placed": "04/04/2022",
            "order_amount": 1350.00,
            "products": [
                {
                    "product_id": 8,
                    "product_name": "smart speaker",
                    "product_quantity": 4,
                    "product_unit_price": 150.00
                },
                {
                    "product_id": 4,
                    "product_name": "smartwatch",
                    "product_quantity": 2,
                    "product_unit_price": 375.00
                }
            ]
        },
        {
            "order_number": 5,
            "client_id": 2,
            "order_date_placed": "12/09/2022",
            "order_amount": 1425.00,
            "products": [
                {
                    "product_id": 14,
                    "product_name": "wireless earbuds",
                    "product_quantity": 3,
                    "product_unit_price": 175.00
                },
                {
                    "product_id": 5,
                    "product_name": "gaming console",
                    "product_quantity": 2,
                    "product_unit_price": 450.00
                }
            ]
        },
        {
            "order_number": 6,
            "client_id": 2,
            "order_date_placed": "12/11/2022",
            "order_amount": 1100.00,
            "products": [
                {
                    "product_id": 17,
                    "product_name": "security camera",
                    "product_quantity": 2,
                    "product_unit_price": 200.00
                },
                {
                    "product_id": 15,
                    "product_name": "robot vacuum",
                    "product_quantity": 2,
                    "product_unit_price": 350.00
                }
            ]
        },
        {
            "order_number": 7,
            "client_id": 2,
            "order_date_placed": "21/12/2022",
            "order_amount": 1640.00,
            "products": [
                {
                    "product_id": 13,
                    "product_name": "portable charger",
                    "product_quantity": 4,
                    "product_unit_price": 35.00
                },
                {
                    "product_id": 10,
                    "product_name": "drone",
                    "product_quantity": 2,
                    "product_unit_price": 750.00
                }
            ]
        },
        {
            "order_number": 8,
            "client_id": 3,
            "order_date_placed": "12/07/2024",
            "order_amount": 600.00,
            "products": [
                {
                    "product_id": 18,
                    "product_name": "smart light bulbs",
                    "product_quantity": 10,
                    "product_unit_price": 30.00
                },
                {
                    "product_id": 11,
                    "product_name": "fitness tracker",
                    "product_quantity": 2,
                    "product_unit_price": 150.00
                }
            ]
        },
        {
            "order_number": 9,
            "client_id": 3,
            "order_date_placed": "23/09/2024",
            "order_amount": 1375.00,
            "products": [
                {
                    "product_id": 14,
                    "product_name": "wireless earbuds",
                    "product_quantity": 5,
                    "product_unit_price": 175.00
                },
                {
                    "product_id": 16,
                    "product_name": "smart thermostat",
                    "product_quantity": 2,
                    "product_unit_price": 250.00
                }
            ]
        },
        {
            "order_number": 10,
            "client_id": 3,
            "order_date_placed": "27/12/2024",
            "order_amount": 2250.00,
            "products": [
                {
                    "product_id": 20,
                    "product_name": "smart lock",
                    "product_quantity": 2,
                    "product_unit_price": 225.00
                },
                {
                    "product_id": 7,
                    "product_name": "virtual reality headset",
                    "product_quantity": 4,
                    "product_unit_price": 450.00
                }
            ]
        }
        
    ]
    })


});

module.exports = router;