const { Schema } = require("mongoose")

const recipientSchema = new Schema({
    operatorName: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true,
        unique: true
    },
    eBill: {
        type: String, 
        required: true,
        unique: true
    }
})

const shopSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    aadharNo: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = { recipientSchema, shopSchema }