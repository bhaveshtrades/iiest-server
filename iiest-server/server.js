const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const app = express();   
const dotenv = require('dotenv');
dotenv.config();   
const dbconfig = require('./config/database');
var http = require('http');
//console.log(process.env.HOST);
app.listen(process.env.PORT || 3000, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log(`Ok, Server is running on ${process.env.PORT}`);
    }
})
