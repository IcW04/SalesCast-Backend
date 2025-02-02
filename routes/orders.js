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
            "order_date_placed": "12/02/2020",
            "order_amount": 1349.97,
            "products": [
                {
                    "product_id": 601,
                    "product_name": "Gaming Laptop",
                    "product_quantity": 1,
                    "product_unit_price": 1299.99
                },
                {
                    "product_id": 602,
                    "product_name": "Wireless Mouse",
                    "product_quantity": 2,
                    "product_unit_price": 24.99
                }
            ]
        },
        {
            "order_number": 2,
            "client_id": 1,
            "order_date_placed": "05/06/2020",
            "order_amount": 479.47,
            "products": [
                {
                    "product_id": 603,
                    "product_name": "Mechanical Keyboard",
                    "product_quantity": 1,
                    "product_unit_price": 89.99
                },
                {
                    "product_id": 604,
                    "product_name": "USB-C Docking Station",
                    "product_quantity": 1,
                    "product_unit_price": 149.5
                },
                {
                    "product_id": 605,
                    "product_name": "External SSD 1TB",
                    "product_quantity": 2,
                    "product_unit_price": 119.99
                }
            ]
        },
        {
            "order_number": 3,
            "client_id": 1,
            "order_date_placed": "07/10/2020",
            "order_amount": 349.99,
            "products": [
                {
                    "product_id": 606,
                    "product_name": "4K Monitor",
                    "product_quantity": 1,
                    "product_unit_price": 349.99
                }
            ]
        },
        {
            "order_number": 4,
            "client_id": 1,
            "order_date_placed": "14/02/2023",
            "order_amount": 319.96,
            "products": [
                {
                    "product_id": 607,
                    "product_name": "Bluetooth Speaker",
                    "product_quantity": 3,
                    "product_unit_price": 39.99
                },
                {
                    "product_id": 608,
                    "product_name": "Smartwatch",
                    "product_quantity": 1,
                    "product_unit_price": 199.99
                }
            ]
        },
        {
            "order_number": 5,
            "client_id": 2,
            "order_date_placed": "21/05/2023",
            "order_amount": 689.97,
            "products": [
                {
                    "product_id": 609,
                    "product_name": "Noise-Cancelling Headphones",
                    "product_quantity": 2,
                    "product_unit_price": 179.99
                },
                {
                    "product_id": 610,
                    "product_name": "Ergonomic Office Chair",
                    "product_quantity": 1,
                    "product_unit_price": 329.99
                }
            ]
        },
        {
            "order_number": 6,
            "client_id": 2,
            "order_date_placed": "21/07/2023",
            "order_amount": 379.98,
            "products": [
                {
                    "product_id": 613,
                    "product_name": "Smart Home Hub",
                    "product_quantity": 1,
                    "product_unit_price": 129.99
                },
                {
                    "product_id": 614,
                    "product_name": "Robot Vacuum",
                    "product_quantity": 1,
                    "product_unit_price": 249.99
                }
            ]
        },
        {
            "order_number": 7,
            "client_id": 3,
            "order_date_placed": "11/07/2024",
            "order_amount": 139.96,
            "products": [
                {
                    "product_id": 615,
                    "product_name": "Portable Power Bank",
                    "product_quantity": 4,
                    "product_unit_price": 34.99
                }
            ]
        },
        {
            "order_number": 8,
            "client_id": 3,
            "order_date_placed": "08/09/2024",
            "order_amount": 119.96,
            "products": [
                {
                    "product_id": 616,
                    "product_name": "Dual Monitor Stand",
                    "product_quantity": 1,
                    "product_unit_price": 59.99
                },
                {
                    "product_id": 617,
                    "product_name": "USB Flash Drive 128GB",
                    "product_quantity": 3,
                    "product_unit_price": 19.99
                }
            ]
        },
        {
            "order_number": 9,
            "client_id": 3,
            "order_date_placed": "30/12/2024",
            "order_amount": 179.98,
            "products": [
                {
                    "product_id": 618,
                    "product_name": "Mechanical Gaming Keyboard",
                    "product_quantity": 1,
                    "product_unit_price": 129.99
                },
                {
                    "product_id": 619,
                    "product_name": "Ergonomic Footrest",
                    "product_quantity": 1,
                    "product_unit_price": 49.99
                }
            ]
        }
    ]
    })


});

module.exports = router;