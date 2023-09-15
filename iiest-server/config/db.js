//Establishing mysql database connection

const mysql = require('mysql');
const hostname = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PWD;
const db_name = process.env.DB_NAME;

const db = mysql.createConnection({
    host: hostname,
    user: db_user,
    password: db_password,
    database: db_name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports = db