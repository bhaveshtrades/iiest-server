const { body, validationResult } = require('express-validator');


//Validation for FBO Form using express-validator
exports.fboValidation = [
    body('fbo_name', 'Enter a valid name').isString().exists(),
    body('owner_name', 'Enter a valid name').isString().exists(),
    body('owner_contact', 'Enter a valid phone number').isMobilePhone().exists(),
    body('email', 'Enter a valid email').isEmail().normalizeEmail().exists(),
    body('state', 'Enter a valid state name').isString().exists(),
    body('district', 'Enter a district name').isString().exists(),
    body('address', 'Enter a valid address').isString().exists(),
    body('product_name', 'Enter a valid product name').isString().exists(),
    body('processing_amount', 'Enter a valid amount').isNumeric().exists(),
    body('service_name', 'Enter a valid service name').isString().exists(),
    body('client_type', 'Enter a valid client type').isString().exists(),
    body('recipient_no', 'Enter a recipient_no').isNumeric().exists(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];