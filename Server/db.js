const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '3712',
    port: 5432 
});

pool.connect((err) => {
    if (err) {
        console.log('Error! Failed to connect to database');
        throw err;
    }
    console.log('Connected to database');
});

module.exports = pool;