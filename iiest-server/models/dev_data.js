const mongoose = require('mongoose');
const { Schema } = mongoose;

const devData = new Schema({
    staff_data: {
        type: Object,
        required: true
    },
    fbo_data: {
        type: Object,
        required: true
    }
})

const dev_data_schema = mongoose.model('dev_data', devData);
module.exports = dev_data_schema;