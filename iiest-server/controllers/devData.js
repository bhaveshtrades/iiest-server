const dev_data_schema = require('../models/dev_data');

exports.staffData = async(req, res)=>{
    const data = await dev_data_schema.find();
    return res.status(200).json(data[0].staff_data);
}

exports.fboData = async(req, res)=>{
    const data = await dev_data_schema.find();
    return res.status(200).json(data[0].fbo_data);
}

