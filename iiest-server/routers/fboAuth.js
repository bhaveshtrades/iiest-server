const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');

router.post('/register', 

//Validation for FBO registration using express-validator
[
    body('fbo_name', 'Enter a valid name').exists(),
    body('owner_name', 'Enter a valid name').exists(),
    body('owner_contact', 'Enter a valid number').isNumeric().exists(),
    body('email', 'Enter a valid email').isEmail().exists(),
    body('state', 'Enter a valid state name').exists(),
    body('district', 'Enter a district name').exists(),
    body('address', 'Enter a valid address').exists(),
    body('product_name', 'Enter a valid product name').exists(),
    body('processing_amount', 'Enter a valid amount').isNumeric().exists(),
    body('service_name', 'Enter a valid service name').exists(),
    body('client_type', 'Enter a valid client type').exists(),
    body('recipient_no', 'Enter a recipient_no').exists()
],
async(req, res)=>{

    let success = false;

    //Fields to be used for FBO form
    const { fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }

    //SQL Query for FBO Registration
    const sql = `INSERT INTO fbo_cases (fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no) VALUES ('${fbo_name}', '${owner_name}', '${owner_contact}', '${email}', '${state}', '${district}', '${address}', '${product_name}', '${processing_amount}', '${service_name}', '${client_type}', '${recipient_no}')`;

    db.query(sql, [fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no], (err, result) =>{
        if(err){
            success = false;
            console.log(err);
            res.status(500).json({success, error: 'Registration failed'});
        }else{
            success = true;
            res.status(200).json({success, message: 'Resgistration Successful'});
        }
    })
});

module.exports = router;