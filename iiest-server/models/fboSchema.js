const mongoose = require('mongoose');
const { Schema } = mongoose;

const baseFboSchema = {
    id_num: {
        type: Number,
        unique: true,
        required: true,
        min: 10000,
        max: 99999
    },
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
    fssai_id: {
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
    },
    createdAt: {
        type: Date,
        required: true
    },
    recipientDetails: {
        type: [{
            type: {type: String, required: true},
            data: {type: Array, required: true}
        }],
        default: []
    },
    payment_mode: {
        type: String, 
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String, 
        required: true
    },
    lastEdit: {
        type: String,
        required: true,
        default: 'Not edited yet'
    }
}

const fboModel = mongoose.model('fbo_registers', new Schema({}, { discriminatorKey: 'fbo_type' }));

const fostacSchema = new Schema({
    ...baseFboSchema
});

const foscosSchema = new Schema({
    ...baseFboSchema,
    license_category: {
        type: String,
        required: true
    },
    license_duration: {
        type: Number,
        required: true
    }
});

const fostacModel = fboModel.discriminator('Fostac Training', fostacSchema);
const foscosModel = fboModel.discriminator('Foscos Training', foscosSchema);

module.exports = {
    fboModel,
    fostacModel,
    foscosModel
};