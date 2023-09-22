//Establishing mongodb database connection

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/iiest';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('Now we are connected');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectToMongo;