const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config();
console.log(process.env.HOST)
//Enstablish the database connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(function(error){
    if(error){
        console.log('Error Connecting to DB');
    }else{
        console.log('Successfully connected to DB');
    }
});

module.exports = db;


