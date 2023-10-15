const fboSchema = require('../models/fboSchema');
const { generateFssaiID }= require('./empGenerator');


//Controller for FBO Registration
exports.fboRegister = async(req, res)=>{
    try {
        let success = false;
        let isUnique = false;
    
        //Fields to be used for FBO form
        const { fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no, water_test_fee, payment_mode ,createdBy, license_category, license_duration, total_amount } = req.body;
    
        //To check if fbo name is already in use
        const existing_fbo = await fboSchema.findOne({fbo_name})
        if(existing_fbo){
            return res.status(401).json({success, message: "This fbo is already in use."});
        }
    
        //To check if owner name is already in use
        const existing_owner_name = await fboSchema.findOne({owner_name});
        if(existing_owner_name){
            return res.status(401).json({success, message: "This owner name is already in use."});
        }
    
        //To check if owner contact is already in use
        const existing_owner_contact = await fboSchema.findOne({owner_contact});
        if(existing_owner_contact){
            return res.status(401).json({success, message: "This owner contact is already in use."});
        }
    
        //To check if email is already in use
        const existing_email = await fboSchema.findOne({email})
        if(existing_email){
            return res.status(401).json({success, message: "This email is already in use."});
        }

        let idNumber;

        while(!isUnique){
            idNumber = Math.floor(10000 + Math.random() * 90000);
            const existingNumber = await fboSchema.findOne({id_num: idNumber});
        if(!existingNumber){
            isUnique = true;
            }
        }

        const generatedFssaiId = generateFssaiID(idNumber, product_name);

    
        await fboSchema.create({
            id_num: idNumber, fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, fssai_id: generatedFssaiId, client_type, recipient_no, water_test_fee, payment_mode, createdBy, license_category, license_duration, total_amount
        })
    
        success = true;
        return res.status(201).json({success, message: "FBO Registration Successful"});
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"})
        }
}

//Controller to get all FBO Data
exports.allFBOData  = async(req, res)=>{
    try {
        const fboData = await fboSchema.find();
        return res.status(200).json({fboData});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}