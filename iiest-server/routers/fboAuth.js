const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fbo_register_schema = require('../models/fbo_register_schema');

router.post('/register', 

//Validation for FBO registration using express-validator
[
    body('fbo_name', 'Enter a valid name').exists(),
    body('owner_name', 'Enter a valid name').exists(),
    body('owner_contact', 'Enter a valid phone number').isMobilePhone().exists(),
    body('email', 'Enter a valid email').isEmail().normalizeEmail().exists(),
    body('state', 'Enter a valid state name').exists(),
    body('district', 'Enter a district name').exists(),
    body('address', 'Enter a valid address').exists(),
    body('product_name', 'Enter a valid product name').exists(),
    body('processing_amount', 'Enter a valid amount').isNumeric().exists(),
    body('service_name', 'Enter a valid service name').exists(),
    body('client_type', 'Enter a valid client type').exists(),
    body('recipient_no', 'Enter a recipient_no').isNumeric().exists()
],
async(req, res)=>{

    try {
    let success = false;

    //Fields to be used for FBO form
    const { fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }

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


    
});

module.exports = router;