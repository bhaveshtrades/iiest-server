//Establishing mongodb database connection
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongoURL = process.env.mongo_url;

const connectToMongo = ()=>{
    mongoose.connect(mongoURL).then(()=>{
        console.log('Now we are connected to the DB');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectToMongo;