const fbo_register_schema = require('../models/fbo_schema');


//Controller for FBO Registration
exports.fbo_register = async(req, res)=>{
    try {
        let success = false;
    
        //Fields to be used for FBO form
        const { fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no } = req.body;
    
        //To check if fbo name is already in use
        const existing_fbo = await fbo_register_schema.findOne({fbo_name})
        if(existing_fbo){
            return res.status(400).json({success, message: "This fbo is already in use."});
        }
    
        //To check if owner name is already in use
        const existing_owner_name = await fbo_register_schema.findOne({owner_name});
        if(existing_owner_name){
            return res.status(400).json({success, message: "This owner name is already in use."});
        }
    
        //To check if owner contact is already in use
        const existing_owner_contact = await fbo_register_schema.findOne({owner_contact});
        if(existing_owner_contact){
            return res.status(400).json({success, message: "This owner contact is already in use."});
        }
    
        //To check if email is already in use
        const existing_email = await fbo_register_schema.findOne({email})
        if(existing_email){
            return res.status(400).json({success, message: "This email is already in use."});
        }
    
        await fbo_register_schema.create({
            fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no
        })
    
        success = true;
        return res.status(201).json({success, message: "FBO Registration Successful"});
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"})
        }
}