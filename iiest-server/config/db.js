//Establishing mongodb database connection

const mongoose = require('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017/iiest';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('Now we are connected to the DB');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectToMongo;