var express = require('express');
var router = express.Router();

const sql = require('mssql');
const { getConnection } = require('../database');
const { generateToken, validateToken } = require('../helpers/jwt');
const { validateRequestBody, validateQueryParams } = require('../helpers/request');

const {OpenAI} = require("openai");

const openai = new OpenAI({
    project: process.env.PROJECT_ID,
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPEANAI_API_KEY
});

router.use(validateToken);

const products = require('../mock/products');
const orders = require('../mock/orders');
const future_orders = require('../mock/future_orders');

// GET all orders

router.get('/', function(req, res, next) {

    return res.success({
      orders: orders.orders
    });
    
});

// GET future predictions on orders

router.get('/predictions', async function(req, res, next) {
    console.log(`REQUEST: Analyze the next JSON object and create some sales oportunities for each client: ${JSON.stringify(orders)}`);

    let response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Based on this orders data: ${JSON.stringify(orders)} \n I would like for you to generate some sales opportunities and date estimates (when will each client make another order based on the history he has, meaning that the proposal dates shouldnt be the same for each client) for the clients that appear in such data, and if possible, i would like for you to format it like the next JSON, giving each sale opportunity a unique id:  \n ${JSON.stringify(future_orders)}, remember to take into account that the products data, excluding the total price and the quantity, are in the following json, and should not be modified: ${JSON.stringify(products)}`
                    }
                ]
            }
        ],
        response_format: {
            "type": "json_object"
        },
        store: true,
        max_completion_tokens: 16384,
        temperature: 1.0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    return res.success({
        future_orders: JSON.parse(response.choices[0].message.content).future_orders
    })

});

module.exports = router;