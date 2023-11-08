
//Establishing mongodb database connection
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { GridFSBucket } = require('mongodb');
dotenv.config();

const config = JSON.parse(process.env.CONFIG);
const mongoURL = config.MONGO_URL;

const connectToMongo = async() => {
     await mongoose.connect(mongoURL).then(() => {
        console.log('Now we are connected to the DB');
        createFsBucket();
    }).catch((error) => {
        console.log(error);
    })
}

const createFsBucket = ()=>{
    if(!mongoose.connection.db){
        throw new Error('MongoDB connection not established');
    }
    console.log('Creating Gridfs Bucket');
    return new GridFSBucket(mongoose.connection.db, { bucketName: 'eBills'});
}

module.exports = {connectToMongo, createFsBucket};