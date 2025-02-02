var express = require('express');
var router = express.Router();

const sql = require('mssql');
const { getConnection } = require('../database');
const { generateToken, validateToken } = require('../helpers/jwt');
const { validateRequestBody } = require('../helpers/request');

// POST para autenticación

router.post('/login', validateRequestBody([
        { name: 'username', type: 'string', required: true, len: 20 },
        { name: 'password', type: 'string', required: true, len: 256 }
    ]),
    function(req, res, next) {

    const {username, password} = req.body;
    let token = generateToken({
        username,
        user_type: 'C'
    });

    return res.success({
        token
    });


});

module.exports = router;