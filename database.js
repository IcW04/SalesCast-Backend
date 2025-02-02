const sql = require('mssql');

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    connectionTimeout: 15000,
    requestTimeout: 60000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

let connection;

async function getConnection() {

    if (!connection) {
        try {
            connection = await sql.connect(sqlConfig);
            console.log('Succesfully established a connection with Azure SQL');
        } catch (err) {
            console.error('Database connection failed: ', err);
            let timeoutErr = new Error();
            timeoutErr.message = 'The system is not available at the moment';
            throw timeoutErr;
        }
    }

    return connection;
}

module.exports = {
    getConnection
}