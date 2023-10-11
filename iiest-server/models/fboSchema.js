const mongoose = require('mongoose');
const { Schema } = mongoose;

const fboRegister = new Schema({
    fbo_name: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    owner_contact: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    product_name: {
        type: String, 
        required: true
    },
    processing_amount: {
        type: Number, 
        required: true
    },
    service_name: {
        type: String, 
        required: true
    },
    client_type: {
        type: String,
        required: true
    },
    recipient_no: {
        type: Number,
        required: true
    },
    water_test_fee: {
        type: Number
    }
});

const fboSchema = mongoose.model('fbo_registers', fboRegister);
module.exports = fboSchema;