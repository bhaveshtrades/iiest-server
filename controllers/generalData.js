const generalDataSchema = require('../models/generalDataSchema');

exports.employeeFormData = async(req, res)=>{
    try {
        const data = await generalDataSchema.find();
        return res.status(200).json(data[0].staff_data);
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

exports.fboFormData = async(req, res)=>{
    try {
        const data = await generalDataSchema.find();
        return res.status(200).json(data[0].fbo_data);
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

